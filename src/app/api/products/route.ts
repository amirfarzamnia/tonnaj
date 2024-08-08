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

    const entity = { create: product, request: product_request }[method];

    if (!entity) return NextResponse.json({ error: 'پارامتر محصول یا درخواست محصول ارسال نشده.' }, { status: 400 });

    if (!Array.isArray(entity.categories) || entity.categories.some((category) => !categories.includes(category))) return NextResponse.json({ error: 'دسته بندی ها به درستی ارسال نشده اند.' }, { status: 400 });

    if (!/^.{25,1000}$/.test(entity.description)) return NextResponse.json({ error: `توضیحات محصول باید بین 25 تا 1000 حرف باشد.` }, { status: 400 });

    if (!entity.location?.latlng || !entity.location.city.length || !entity.location.state.length || !(typeof entity.location.latlng.lat === 'number' && typeof entity.location.latlng.lng === 'number')) return NextResponse.json({ error: 'لطفا موقعیت مکانی خود را به درستی انتخاب کنید.' }, { status: 400 });

    if (method === 'create') {
        if (!Array.isArray(entity.images) || !entity.images.length) return NextResponse.json({ error: 'باید حداقل یک عکس از محصول خود بارگذاری کنید.' }, { status: 400 });

        if (typeof entity.price !== 'number' || !(entity.price >= 10000 && entity.price <= 10000000000)) return NextResponse.json({ error: 'هزینه محصول باید بین ده هزار تومان تا ده میلیارد تومان باشد.' }, { status: 400 });

        if (!/^.{5,50}$/.test(entity.name)) return NextResponse.json({ error: 'نام محصول باید بین 5 تا 50 حرف باشد.' }, { status: 400 });
    }

    const id = randomBytes(3).toString('hex');

    await database.collection(method === 'create' ? 'products' : 'product_requests').insertOne({ ...entity, id, timestamp: Date.now(), author: session, available: true, ...(method === 'create' && { rating: 5 }) });

    const successMessage = method === 'create' ? 'محصول شما با موفقیت به تناژ اضافه شد.' : 'درخواست خرید محصول شما با موفقیت به تناژ اضافه شد.';

    return NextResponse.json({ message: successMessage, id }, { status: 200 });
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
