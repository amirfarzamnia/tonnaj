import { NextResponse, NextRequest } from 'next/server';

const verificationCodes: { [key: string]: string } = {};

export const POST = async (request: NextRequest) => {
    const { phone_number, verification_code }: { phone_number: string; verification_code: string } = await request.json();

    // const req = await fetch('https://api.kavenegar.com/v1/' + process.env.KAVENEGAR_API_KEY + '/sms/send.json', { method: 'POST', body: JSON.stringify({ message: 'خدمات پیام کوتاه کاوه نگار', receptor: phone_number }) });
    // const json = await req.json();

    if (verification_code) {
        if (!phone_number) return NextResponse.json({ error: 'شماره تلفن همراه ارسال نشده.' }, { status: 404 });

        if (verificationCodes[phone_number] !== verification_code) return NextResponse.json({ error: 'کد تایید ارسال شده نادرست است.' }, { status: 404 });
    } else if (phone_number) {
        if (!/^(09\d{9}|98\d{10})$/.test(phone_number)) return NextResponse.json({ error: 'شماره تلفن همراه به درستی وارد نشده.' }, { status: 404 });

        const code = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join('');

        console.log(code);

        verificationCodes[phone_number] = code;

        return new NextResponse(null, { status: 204 });
    }

    return NextResponse.json({ error: 'پارامترهای ارسالی قابل قبول نیستند.' }, { status: 404 });
};
