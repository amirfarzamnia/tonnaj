import { NextResponse, NextRequest } from 'next/server';
import { database } from '@/mongodb';
import { randomBytes } from 'crypto';

const verificationCodes: { [key: string]: string } = {};

export const POST = async (request: NextRequest) => {
    const { phone_number, verification_code }: { phone_number: string; verification_code: string } = await request.json();

    if (verification_code) {
        if (!phone_number) return NextResponse.json({ error: 'شماره تلفن همراه ارسال نشده.' }, { status: 404 });

        if (verificationCodes[phone_number] !== verification_code) return NextResponse.json({ error: 'کد تایید ارسال شده نادرست است.' }, { status: 404 });

        const session_id = randomBytes(16).toString('hex');

        await database.collection('sessions').insertOne({ phone_number, session_id, created_at: new Date() });

        const response = new NextResponse(null, { status: 204 });

        response.cookies.set('session', session_id, { httpOnly: true, sameSite: 'strict', maxAge: 86400000 });

        return response;
    } else if (phone_number) {
        if (!/^(09\d{9}|98\d{10})$/.test(phone_number)) return NextResponse.json({ error: 'شماره تلفن همراه به درستی وارد نشده.' }, { status: 404 });

        const code = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join('');

        console.log(code);

        verificationCodes[phone_number] = code;

        return new NextResponse(null, { status: 204 });
    }

    return NextResponse.json({ error: 'پارامترهای ارسالی قابل قبول نیستند.' }, { status: 404 });
};
