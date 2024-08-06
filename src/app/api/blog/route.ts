import { database } from '@/mongodb';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
    try {
        const { searchParams } = new URL(request.url);
        const categoriesParam = searchParams.get('categories');
        const name = searchParams.get('name');

        let query = {};

        if (categoriesParam) {
            const categoriesArray = categoriesParam.split(',');

            query = { categories: { $in: categoriesArray } };
            const blogs = await database.collection('posts').find(query).toArray();

            return NextResponse.json(blogs, { status: 200 });
        } else if (name) {
            const blogInfo = await database.collection('posts').findOne({ name });
            return NextResponse.json({ message: 'find', data: blogInfo }, { status: 200 });
        } else {
            const blogInfo = await database.collection('blog').find().toArray();
            return NextResponse.json({ message: 'find', data: blogInfo }, { status: 200 });
        }
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return NextResponse.json({ message: 'خطا در دریافت بلاگ‌ها' }, { status: 500 });
    }
};
