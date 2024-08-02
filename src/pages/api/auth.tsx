import { NextApiRequest, NextApiResponse } from 'next';
import { database } from '@/mongodb';
import Kavenegar from 'kavenegar';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (req.method === 'POST') {
        const { phone_number, verification_code } = req.body;

        if (phone_number) {
            Kavenegar.KavenegarApi({ apikey: '456B516E516264766151537254633677744B5A6F466A3242535963365861754277596E6F47484E4F6A536B3D' }).Send(
                {
                    message: 'وب سرویس تخصصی کاوه نگار',
                    sender: '10004346',
                    receptor: '989130288776'
                },
                (response, status) => {
                    console.log(response);
                    console.log(status);
                }
            );
        } else if (verification_code) {
        } else {
            res.status(400).json({ error: 'Invalid request' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};
