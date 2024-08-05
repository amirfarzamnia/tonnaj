import { NextResponse, NextRequest } from 'next/server';
import { database } from '@/mongodb';

export const GET = async (request: NextRequest) => {
    const categories = new URL(request.url).searchParams.get('categories');
    const filter = { ...(categories && { categories: { $in: categories.split(',').map((cat) => cat.trim()) } }) };

    return NextResponse.json(await database.collection('products').find(filter).toArray(), { status: 200 });
};
