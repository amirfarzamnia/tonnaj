import { NextResponse, NextRequest } from 'next/server';
import findSession from '@/functions/find-session';
import categories from '@/constants/categories';
import { ProductTypes } from '@/types/product';
import { database } from '@/mongodb';
import { randomBytes } from 'crypto';

export const POST = async (request: NextRequest) => {
    const product: ProductTypes = await request.json();

    if (!Array.isArray(product.categories) || product.categories.some((category) => !categories.includes(category))) return NextResponse.json({ message: 'دسته بندی ها به درستی ارسال نشده اند.' }, { status: 404 });

    if (!/^.{50,500}$/.test(product.description)) return NextResponse.json({ message: 'توضیحات محصول باید بین 50 تا 500 حرف باشد.' }, { status: 404 });

    if (!Array.isArray(product.images) || !product.images.every((image) => /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/.test(image))) return NextResponse.json({ message: 'تصاویر به درستی بارگذاری نشده اند.' }, { status: 404 });

    if (typeof product.price !== 'number' || !(product.price >= 10000 && product.price <= 10000000000)) return NextResponse.json({ message: 'هزینه محصول باید بین ده هزار تومان تا ده میلیارد تومان باشد.' }, { status: 404 });

    if (!product.location?.latlng || !(typeof product.location.latlng.lat === 'number' && typeof product.location.latlng.lng === 'number')) return NextResponse.json({ message: 'موقعیت مکانی به درستی ارسال نشده.' }, { status: 404 });

    if (!/^.{5,50}$/.test(product.name)) return NextResponse.json({ message: 'نام محصول باید بین 5 تا 50 حرف باشد.' }, { status: 404 });

    const { phone_number } = (await findSession(request)) || {};

    if (!phone_number) return new NextResponse(null, { status: 403 });

    return NextResponse.json({ message: 'Product added successfully' }, { status: 200 });
};

export const GET = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);

    const id = searchParams.get('id');
    const categories = searchParams.get('categories');

    const filter = id ? { id } : categories ? { categories: { $in: categories.split(',').map((cat) => cat.trim()) } } : {};

    return NextResponse.json(await database.collection('products').find(filter).toArray(), { status: 200 });
};
