import { database } from '@/mongodb';
import { ObjectId } from 'mongodb';
import { NextRequest } from 'next/server';

export async function findSessions(request: NextRequest) {
    const sessions_find = (await database.collection('sessions').findOne({ session: request.cookies.get('session')?.value })) as { _id: ObjectId; phone_number: string; session: string; created_at: number };

    return sessions_find;
}
