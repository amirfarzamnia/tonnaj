import { NextRequest, NextResponse } from 'next/server';
import findSession from '@/functions/find-session';
import { randomBytes } from 'node:crypto';
import { AuthTypes } from '@/types/auth';
import { database } from '@/mongodb';

const verificationCodes: { [phone_number: AuthTypes['phone_number']]: { code: AuthTypes['verification_code']; name: AuthTypes['name']; expiresAt: number; attempts: number } } = {};

const VERIFICATION_CODE_EXPIRY_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 3;

export const POST = async (request: NextRequest) => {
    const { phone_number, verification_code, name }: AuthTypes = await request.json();

    if (verification_code) {
        if (!phone_number) return NextResponse.json({ error: 'شماره تلفن همراه ارسال نشده.' }, { status: 400 });

        const stored = verificationCodes[phone_number];

        if (!stored) return NextResponse.json({ error: 'کد تایید یافت نشد.' }, { status: 400 });

        if (Date.now() > stored.expiresAt) {
            delete verificationCodes[phone_number];

            return NextResponse.json({ error: 'کد تایید منقضی شده است.' }, { status: 400 });
        }

        if (stored.attempts >= MAX_ATTEMPTS) {
            delete verificationCodes[phone_number];

            return NextResponse.json({ error: 'تعداد تلاش‌ها بیش از حد مجاز است. لطفاً درخواست جدیدی ارسال کنید.' }, { status: 400 });
        }

        if (stored.code !== verification_code) {
            stored.attempts += 1;

            return NextResponse.json({ error: 'کد تایید ارسال شده نادرست است.' }, { status: 400 });
        }

        const session = randomBytes(16).toString('hex');

        await database.collection('sessions').insertOne({ phone_number, session, name: stored.name, created_at: Date.now() });

        const response = new NextResponse(null, { status: 204 });

        response.cookies.set('session', session, { httpOnly: true, sameSite: 'strict', maxAge: 86400 * 1000 });

        delete verificationCodes[phone_number];

        return response;
    } else if (phone_number) {
        if (!/^.{5,50}$/.test(name)) return NextResponse.json({ error: 'نام شما یا شرکت شما باید بین 5 تا 50 حرف باشد.' }, { status: 400 });

        const code = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join('');

        fetch('https://api.kavenegar.com/v1/' + process.env.KAVENEGAR_API_KEY + '/verify/lookup.json', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ receptor: phone_number, token: code, template: 'tonnaj' }).toString() });

        verificationCodes[phone_number] = { code, expiresAt: Date.now() + VERIFICATION_CODE_EXPIRY_MS, name, attempts: 0 };

        return new NextResponse(null, { status: 204 });
    }

    return NextResponse.json({ error: 'پارامترهای ارسالی قابل قبول نیستند.' }, { status: 400 });
};

export const GET = async (request: NextRequest) => {
    const session = await findSession(request);

    return session ? NextResponse.json(session, { status: 200 }) : new NextResponse(null, { status: 404 });
};

export const DELETE = async (request: NextRequest) => {
    await database.collection('sessions').deleteOne({ session: request.cookies.get('session')?.value });

    return new NextResponse(null, { status: 204 });
};
