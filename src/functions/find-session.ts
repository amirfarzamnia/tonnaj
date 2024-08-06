import { SessionTypes } from '@/types/session';
import { Document, WithId } from 'mongodb';
import { NextRequest } from 'next/server';
import { database } from '@/mongodb';

export default async (request: NextRequest): Promise<SessionTypes | null> => (await database.collection('sessions').findOne({ session: request.cookies.get('session')?.value })) as (WithId<Document> & SessionTypes) | null;
