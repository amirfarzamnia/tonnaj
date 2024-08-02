import { NextApiRequest, NextApiResponse } from 'next';
import { database } from '@/mongodb';
import Kavenegar from 'kavenegar';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (req.method === 'POST') {
        const { phone_number, verification_code } = req.body;

        if (phone_number) {
            Kavenegar.KavenegarApi({ apikey: '6B57554970696A54724C6536785034716559324A6B78734D734C304E4C4C623073494A4E3574782B4C70303D' }).Send({ message: 'خدمات پیام کوتاه کاوه نگار', sender: '1000689696', receptor: '09130288776' }, () => {
                console.log(true);
            });
        } else if (verification_code) {
        } else {
            res.status(400).json({ error: 'Invalid request' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};
