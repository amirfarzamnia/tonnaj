import { NextRequest, NextResponse } from 'next/server';
import { database } from '@/mongodb';

export const GET = async (request: NextRequest) => {
    const session = await findSession(request);

    if (!session) return new NextResponse(null, { status: 400 });

    return NextResponse.json(session, { status: 200 });
};

export const DELETE = async (request: NextRequest) => {
    const session = await findSession(request);

    if (!session) return new NextResponse(null, { status: 403 });

    return NextResponse.json(session, { status: 200 });
};

async function findSession(request: NextRequest) {
    return await database.collection('sessions').findOne({ session: request.cookies.get('session')?.value });
}
