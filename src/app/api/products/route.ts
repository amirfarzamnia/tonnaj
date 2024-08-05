import { NextResponse, NextRequest } from 'next/server';
import { database } from '@/mongodb';

export const GET = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);

    const id = searchParams.get('id');
    const categories = searchParams.get('categories');

    const filter = id ? { id } : categories ? { categories: { $in: categories.split(',').map((cat) => cat.trim()) } } : {};

    return NextResponse.json(await database.collection('products').find(filter).toArray(), { status: 200 });
};
