import { NextResponse, NextRequest } from 'next/server';
import { KavenegarApi } from 'kavenegar';
import { database } from '@/mongodb';

export const POST = async (request: NextRequest) => {
    const { phone_number, verification_code } = await request.json();

    if (phone_number) {
        KavenegarApi({ apikey: '6B57554970696A54724C6536785034716559324A6B78734D734C304E4C4C623073494A4E3574782B4C70303D' }).Send({ message: 'خدمات پیام کوتاه کاوه نگار', sender: '1000689696', receptor: phone_number }, () => {
            console.log(true);
        });
    } else if (verification_code) {
    } else {
        return NextResponse.json({ error: 'شماره تماس و یا کد تایید وارد نشده!' });
    }

    return NextResponse.json({ error: 'Test' }, { status: 400 });
};
