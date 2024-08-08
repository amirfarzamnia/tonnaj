import { NextRequest, NextResponse } from 'next/server';
import findSession from '@/functions/find-session';
import { AuthTypes } from '@/types/auth';
import { database } from '@/mongodb';
import { randomBytes } from 'crypto';

const verificationCodes: { [phone_number: AuthTypes['phone_number']]: { code: AuthTypes['verification_code']; name: AuthTypes['name']; expiresAt: number } } = {};
const VERIFICATION_CODE_EXPIRY_MS = 10 * 60 * 1000;

export const POST = async (request: NextRequest) => {
    const { phone_number, verification_code, name }: AuthTypes = await request.json();

    if (verification_code) {
        if (!phone_number) return NextResponse.json({ error: 'شماره تلفن همراه ارسال نشده.' }, { status: 400 });

        const stored = verificationCodes[phone_number];

        if (!stored) return NextResponse.json({ error: 'کد تایید یافت نشد.' }, { status: 400 });

        if (Date.now() > stored.expiresAt) return NextResponse.json({ error: 'کد تایید منقضی شده است.' }, { status: 400 });

        if (stored.code !== verification_code) return NextResponse.json({ error: 'کد تایید ارسال شده نادرست است.' }, { status: 400 });

        const session = randomBytes(16).toString('hex');

        await database.collection('sessions').insertOne({ phone_number, session, name: stored.name, created_at: Date.now() });

        const response = new NextResponse(null, { status: 204 });

        response.cookies.set('session', session, { httpOnly: true, sameSite: 'strict', maxAge: 86400 * 1000 });

        return response;
    } else if (phone_number) {
        if (!/^(09\d{9}|98\d{10})$/.test(phone_number)) return NextResponse.json({ error: 'شماره تلفن همراه به درستی وارد نشده.' }, { status: 400 });

        if (!/^.{5,50}$/.test(name)) return NextResponse.json({ error: 'نام شما یا شرکت شما باید بین 5 تا 50 حرف باشد.' }, { status: 400 });

        const code = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join('');

        console.log('Verification Code Request', phone_number, code);

        verificationCodes[phone_number] = { code, expiresAt: Date.now() + VERIFICATION_CODE_EXPIRY_MS, name };

        return new NextResponse(null, { status: 204 });
    }

    return NextResponse.json({ error: 'پارامترهای ارسالی قابل قبول نیستند.' }, { status: 400 });
};

export const GET = async (request: NextRequest) => NextResponse.json(await findSession(request), { status: 200 });

export const DELETE = async (request: NextRequest) => {
    await database.collection('sessions').deleteOne({ session: request.cookies.get('session')?.value });

    return new NextResponse(null, { status: 204 });
};
