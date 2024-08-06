import { NextResponse, NextRequest } from 'next/server';
import findSession from '@/functions/find-session';
import { ProductTypes } from '@/types/product';
import { database } from '@/mongodb';
import { randomBytes } from 'crypto';

export const POST = async (request: NextRequest) => {
    return;
    // const { name, description, images, categories, price, max, min, name, city, state }: ProductTypes = await request.json();

    // if (!name || !description || !price) return NextResponse.json({ message: 'Validation Error' }, { status: 400 });

    // const { phone_number } = (await findSession(request)) || {};

    // if (!phone_number) return new NextResponse(null, { status: 403 });

    // await database.collection('products').insertOne({
    //     id: randomBytes(4).toString('hex'),
    //     name,
    //     description,
    //     price,
    //     categories,
    //     images,
    //     available: true,
    //     rating: 5,
    //     max,
    //     min,
    //     author: {
    //         name,
    //         phone_number
    //     },
    //     location: {
    //         city,
    //         state
    //     },
    //     timestamp: Date.now()
    // } as ProductTypes);

    // return NextResponse.json({ message: 'Product added successfully' }, { status: 200 });
};

export const GET = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);

    const id = searchParams.get('id');
    const categories = searchParams.get('categories');

    const filter = id ? { id } : categories ? { categories: { $in: categories.split(',').map((cat) => cat.trim()) } } : {};

    return NextResponse.json(await database.collection('products').find(filter).toArray(), { status: 200 });
};
