import { NextRequest, NextResponse } from 'next/server';
import { database } from '@/mongodb';

export const GET = async (request: NextRequest) => {
    const session = await database.collection('sessions').findOne({ session: request.cookies.get('session')?.value });

    if (!session) return new NextResponse(null, { status: 400 });

    return NextResponse.json(session, { status: 200 });
};
