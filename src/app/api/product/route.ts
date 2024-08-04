import { database } from '@/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';

interface props {
    title: string;
    description: string;
    images: string[];
    categories: string[];
    price: string;
    available: boolean;
    rating: 1 | 2 | 3 | 4 | 5;
    name: string;
    phone_number: string;
}

export const POST = async (req: NextRequest) => {
    try {
        const { title, description, images, categories, price, rating, available, name, phone_number }: props = await req.json();
        if (!title || !description || !price || !available || !rating || !name || !phone_number) return NextResponse.json({ message: 'Validation Error' }, { status: 400 });

        const id = randomBytes(3).toString('hex');

        await database.collection('products').insertOne({
            id,
            title,
            description,
            images,
            categories,
            available,
            rating,
            author: {
                name,
                phone_number
            },
            timestamp: Date.now()
        });

        return NextResponse.json({ message: 'Product added successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 404 });
    }
};
