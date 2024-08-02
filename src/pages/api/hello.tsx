import { NextApiRequest, NextApiResponse } from 'next';
import { database } from '@/mongodb';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (req.method === 'GET') {
        res.status(200).json({ message: 'Hello, World!' });

        console.log(await database.collections());
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
