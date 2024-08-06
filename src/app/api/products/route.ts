import { NextResponse, NextRequest } from 'next/server';
import { database } from '@/mongodb';
import { randomBytes } from 'crypto';
import { productsProps, ProductTypes } from '@/types/product';
import { findSessions } from '@/functions/sessions';
import { AuthTypes } from '@/types/auth';

export const POST = async (req: NextRequest) => {
    const { title, description, images, categories, price, max, min, name, city, state }: productsProps = await req.json();
    if (!title || !description || !price) return NextResponse.json({ message: 'Validation Error' }, { status: 400 });

    const id = randomBytes(4).toString('hex');
    const userSessions = await findSessions(req);

    const { phone_number } = userSessions;

    if (!phone_number) return NextResponse.json({ message: 'Error' }, { status: 400 });

    await database.collection('products').insertOne({
        id,
        title,
        description,
        price,
        categories,
        images,
        available: true,
        rating: 5,
        max,
        min,
        author: {
            name,
            phone_number
        },
        location: {
            city,
            state
        },
        timestamp: Date.now()
    } as ProductTypes);

    return NextResponse.json({ message: 'Product added successfully' }, { status: 200 });
};

export const GET = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);

    const id = searchParams.get('id');
    const categories = searchParams.get('categories');

    const filter = id ? { id } : categories ? { categories: { $in: categories.split(',').map((cat) => cat.trim()) } } : {};

    return NextResponse.json(await database.collection('products').find(filter).toArray(), { status: 200 });
};
