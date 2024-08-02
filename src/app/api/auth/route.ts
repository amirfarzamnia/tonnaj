import { NextResponse, NextRequest } from 'next/server';

const verificationCodes: { [key: string]: string } = {};

export const POST = async (request: NextRequest) => {
    const { phone_number, verification_code }: { phone_number: string; verification_code: string } = await request.json();

    // const req = await fetch('https://api.kavenegar.com/v1/' + process.env.KAVENEGAR_API_KEY + '/sms/send.json', { method: 'POST', body: JSON.stringify({ message: 'خدمات پیام کوتاه کاوه نگار', receptor: phone_number }) });
    // const json = await req.json();

    if (verification_code) {
    } else if (phone_number) {
        const code = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join('');

        console.log(code);

        verificationCodes[phone_number] = code;

        return new NextResponse(null, { status: 204 });
    }

    return NextResponse.json({ error: 'شماره همراه وارد نشده!' });
};
