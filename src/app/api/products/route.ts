import { ProductTypes, ProductRequestTypes } from '@/types/product';
import { NextResponse, NextRequest } from 'next/server';
import findSession from '@/functions/find-session';
import categories from '@/constants/categories';
import { database } from '@/mongodb';
import { randomBytes } from 'crypto';

export const POST = async (request: NextRequest) => {
    const { product, product_request, method }: { product?: ProductTypes; product_request?: ProductRequestTypes; method: string } = await request.json();
    const session = await findSession(request);

    if (!session) return new NextResponse(null, { status: 403 });

    switch (method) {
        case 'create': {
            if (!product) return NextResponse.json({ message: 'پارامتر محصول ارسال نشده.' }, { status: 404 });

            if (!Array.isArray(product.categories) || product.categories.some((category) => !categories.includes(category))) return NextResponse.json({ message: 'دسته بندی ها به درستی ارسال نشده اند.' }, { status: 404 });

            if (!/^.{50,500}$/.test(product.description)) return NextResponse.json({ message: 'توضیحات محصول باید بین 50 تا 500 حرف باشد.' }, { status: 404 });

            if (!Array.isArray(product.images) || !product.images.every((image) => /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/.test(image))) return NextResponse.json({ message: 'تصاویر به درستی بارگذاری نشده اند.' }, { status: 404 });

            if (typeof product.price !== 'number' || !(product.price >= 10000 && product.price <= 10000000000)) return NextResponse.json({ message: 'هزینه محصول باید بین ده هزار تومان تا ده میلیارد تومان باشد.' }, { status: 404 });

            if (!product.location?.latlng || typeof product.location.city !== 'string' || typeof product.location.state !== 'string' || !(typeof product.location.latlng.lat === 'number' && typeof product.location.latlng.lng === 'number')) return NextResponse.json({ message: 'موقعیت مکانی به درستی ارسال نشده.' }, { status: 404 });

            if (!/^.{5,50}$/.test(product.name)) return NextResponse.json({ message: 'نام محصول باید بین 5 تا 50 حرف باشد.' }, { status: 404 });

            await database.collection('products').insertOne({ ...product, id: randomBytes(3).toString('hex'), timestamp: Date.now(), available: true, rating: 5, author: session });

            return NextResponse.json({ message: 'محصول شما با موفقیت به تناژ اضافه شد.' }, { status: 200 });
        }

        case 'request': {
            if (!product_request) return NextResponse.json({ message: 'پارامتر محصول درخواستی ارسال نشده.' }, { status: 404 });

            if (!/^.{50,500}$/.test(product_request.description)) return NextResponse.json({ message: 'توضیحات محصول مورد نیاز باید بین 50 تا 500 حرف باشد.' }, { status: 404 });

            if (!product_request.location?.latlng || typeof product_request.location.city !== 'string' || typeof product_request.location.state !== 'string' || !(typeof product_request.location.latlng.lat === 'number' && typeof product_request.location.latlng.lng === 'number')) return NextResponse.json({ message: 'موقعیت مکانی به درستی ارسال نشده.' }, { status: 404 });

            await database.collection('product_requests').insertOne({ ...product_request, id: randomBytes(3).toString('hex'), timestamp: Date.now(), author: session, available: true });

            return NextResponse.json({ message: 'درخواست خرید محصول شما با موفقیت به تناژ اضافه شد.' }, { status: 200 });
        }

        default: {
            return NextResponse.json({ message: 'متود ارسالی نادرست است.' }, { status: 404 });
        }
    }
};

export const GET = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);

    const id = searchParams.get('id');
    const categories = searchParams.get('categories');

    const filter = id ? { id } : categories ? { categories: { $in: categories.split(',').map((cat) => cat.trim()) } } : {};

    return NextResponse.json(await database.collection('products').find(filter).toArray(), { status: 200 });
};
