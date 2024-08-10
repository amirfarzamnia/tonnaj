import { NextRequest, NextResponse } from 'next/server';
import { database } from '@/mongodb';

export const GET = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);
    const categories = searchParams.get('categories');
    const name = searchParams.get('name');

    if (name) return NextResponse.json(await database.collection('posts').findOne({ name }), { status: 200 });

    if (categories) {
        const post = database.collection('posts').find({ categories: { $in: categories.split(',') } });

        return NextResponse.json(await post.toArray(), { status: 200 });
    }

    return NextResponse.json(await database.collection('posts').find().toArray(), { status: 200 });
};
