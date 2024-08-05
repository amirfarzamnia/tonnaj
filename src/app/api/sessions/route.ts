import { NextRequest, NextResponse } from 'next/server';
import { database } from '@/mongodb';

export const GET = async (request: NextRequest) => NextResponse.json(await database.collection('sessions').findOne({ session: request.cookies.get('session')?.value }), { status: 200 });

export const DELETE = async (request: NextRequest) => {
    await database.collection('sessions').deleteOne({ session: request.cookies.get('session')?.value });

    return new NextResponse(null, { status: 204 });
};
