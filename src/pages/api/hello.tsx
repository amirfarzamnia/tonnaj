import { NextApiRequest, NextApiResponse } from 'next';
import { database } from '@/mongodb';

export default (req: NextApiRequest, res: NextApiResponse): void => {
    if (req.method === 'GET') {
        res.status(200).json({ message: 'Hello, World!' });
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
