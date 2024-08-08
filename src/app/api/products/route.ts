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
            if (!product) return NextResponse.json({ error: 'پارامتر محصول ارسال نشده.' }, { status: 400 });

            if (!Array.isArray(product.categories) || product.categories.some((category) => !categories.includes(category))) return NextResponse.json({ error: 'دسته بندی ها به درستی ارسال نشده اند.' }, { status: 400 });

            if (!/^.{25,1000}$/.test(product.description)) return NextResponse.json({ error: 'توضیحات محصول باید بین 25 تا 1000 حرف باشد.' }, { status: 400 });

            if (!Array.isArray(product.images)) return NextResponse.json({ error: 'تصاویر به درستی بارگذاری نشده اند.' }, { status: 400 });

            if (!product.images.length) return NextResponse.json({ error: 'باید حداقل یک عکس از محصول خود بارگذاری کنید.' }, { status: 400 });

            if (typeof product.price !== 'number' || !(product.price >= 10000 && product.price <= 10000000000)) return NextResponse.json({ error: 'هزینه محصول باید بین ده هزار تومان تا ده میلیارد تومان باشد.' }, { status: 400 });

            if (!product.location?.latlng || !product.location.city.length || !product.location.state.length || !(typeof product.location.latlng.lat === 'number' && typeof product.location.latlng.lng === 'number')) return NextResponse.json({ error: 'لطفا موقعیت مکانی خود را به درستی انتخاب کنید.' }, { status: 400 });

            if (!/^.{5,50}$/.test(product.name)) return NextResponse.json({ error: 'نام محصول باید بین 5 تا 50 حرف باشد.' }, { status: 400 });

            const id = randomBytes(3).toString('hex');

            await database.collection('products').insertOne({ ...product, id, timestamp: Date.now(), available: true, rating: 5, author: session });

            return NextResponse.json({ message: 'محصول شما با موفقیت به تناژ اضافه شد.', id }, { status: 200 });
        }

        case 'request': {
            if (!product_request) return NextResponse.json({ error: 'پارامتر محصول درخواستی ارسال نشده.' }, { status: 400 });

            if (!Array.isArray(product_request.categories) || product_request.categories.some((category) => !categories.includes(category))) return NextResponse.json({ error: 'دسته بندی ها به درستی ارسال نشده اند.' }, { status: 400 });

            if (!/^.{25,150}$/.test(product_request.description)) return NextResponse.json({ error: 'توضیحات محصول مورد نیاز باید بین 25 تا 150 حرف باشد.' }, { status: 400 });

            if (!product_request.location?.latlng || !product_request.location.city.length || !product_request.location.state.length || !(typeof product_request.location.latlng.lat === 'number' && typeof product_request.location.latlng.lng === 'number')) return NextResponse.json({ error: 'لطفا موقعیت مکانی خود را به درستی انتخاب کنید.' }, { status: 400 });

            const id = randomBytes(3).toString('hex');

            await database.collection('product_requests').insertOne({ ...product_request, id, timestamp: Date.now(), author: session, available: true });

            return NextResponse.json({ message: 'درخواست خرید محصول شما با موفقیت به تناژ اضافه شد.', id }, { status: 200 });
        }

        default: {
            return NextResponse.json({ error: 'متود ارسالی نادرست است.' }, { status: 400 });
        }
    }
};

export const GET = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);

    const id = searchParams.get('id');
    const categories = searchParams.get('categories');
    const type = searchParams.get('type') || 'product';

    const filter = id ? { id } : categories ? { categories: { $in: categories.split(',').map((cat) => cat.trim()) } } : {};

    const collection = type === 'request' ? 'product_requests' : 'products';
    const data = await database.collection(collection).find(filter).toArray();

    return NextResponse.json(data, { status: 200 });
};
