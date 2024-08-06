import { NextRequest } from 'next/server';
import { database } from '@/mongodb';

export default async (request: NextRequest) => await database.collection('sessions').findOne({ session: request.cookies.get('session')?.value });
