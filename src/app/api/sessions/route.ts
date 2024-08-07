import { NextRequest, NextResponse } from 'next/server';
import findSession from '@/functions/find-session';
import { AuthTypes } from '@/types/auth';
import { database } from '@/mongodb';
import { randomBytes } from 'crypto';

const verificationCodes: { [key: string]: AuthTypes['verification_code'] } = {};

export const POST = async (request: NextRequest) => {
    const { phone_number, verification_code }: { phone_number: AuthTypes['phone_number']; verification_code: AuthTypes['verification_code'] } = await request.json();

    if (verification_code) {
        if (!phone_number) return NextResponse.json({ error: 'شماره تلفن همراه ارسال نشده.' }, { status: 400 });

        if (verificationCodes[phone_number] !== verification_code) return NextResponse.json({ error: 'کد تایید ارسال شده نادرست است.' }, { status: 400 });

        const session = randomBytes(16).toString('hex');

        await database.collection('sessions').insertOne({ phone_number, session, created_at: Date.now() });

        const response = new NextResponse(null, { status: 204 });

        response.cookies.set('session', session, { httpOnly: true, sameSite: 'strict', maxAge: 86400000 });

        return response;
    } else if (phone_number) {
        if (!/^(09\d{9}|98\d{10})$/.test(phone_number)) return NextResponse.json({ error: 'شماره تلفن همراه به درستی وارد نشده.' }, { status: 400 });

        const code = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join('');

        console.log('Verification Code Request', phone_number, code);

        verificationCodes[phone_number] = code;

        return new NextResponse(null, { status: 204 });
    }

    return NextResponse.json({ error: 'پارامترهای ارسالی قابل قبول نیستند.' }, { status: 400 });
};

export const GET = async (request: NextRequest) => NextResponse.json(await findSession(request), { status: 200 });

export const DELETE = async (request: NextRequest) => {
    await database.collection('sessions').deleteOne({ session: request.cookies.get('session')?.value });

    return new NextResponse(null, { status: 204 });
};
