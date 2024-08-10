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

    if (entity.categories.length > 5) return NextResponse.json({ error: 'نمیتوانید بیشتر از 5 دسته بندی را برای محصول خود انتخاب کنید.' }, { status: 400 });

    if (!/^.{25,1000}$/.test(entity.description)) return NextResponse.json({ error: `توضیحات محصول باید بین 25 تا 1000 حرف باشد.` }, { status: 400 });

    if (!entity.location?.latlng || !entity.location.city.length || !entity.location.state.length || !(typeof entity.location.latlng.lat === 'number' && typeof entity.location.latlng.lng === 'number')) return NextResponse.json({ error: 'لطفا موقعیت مکانی خود را به درستی انتخاب کنید.' }, { status: 400 });

    if (method === 'create') {
        const prod = entity as ProductTypes;

        if (!Array.isArray(prod.images) || !prod.images.length) return NextResponse.json({ error: 'باید حداقل یک عکس از محصول خود بارگذاری کنید.' }, { status: 400 });

        if (typeof prod.price !== 'number' || !(prod.price >= 10000 && prod.price <= 10000000000)) return NextResponse.json({ error: 'هزینه محصول باید بین ده هزار تومان تا ده میلیارد تومان باشد.' }, { status: 400 });

        if (!/^.{5,50}$/.test(prod.name)) return NextResponse.json({ error: 'نام محصول باید بین 5 تا 50 حرف باشد.' }, { status: 400 });
    }

    const id = randomBytes(3).toString('hex');

    await database.collection(method === 'create' ? 'products' : 'product_requests').insertOne({ ...entity, id, timestamp: Date.now(), author: session, available: true });

    return NextResponse.json({ message: method === 'create' ? 'محصول شما با موفقیت به تناژ اضافه شد.' : 'درخواست خرید محصول شما با موفقیت به تناژ اضافه شد.', id }, { status: 200 });
};

export const GET = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);

    const id = searchParams.get('id');
    const categories = searchParams.get('categories');

    const sortOptions: Record<string, Record<string, 1 | -1>> = {
        available: { available: 1 },
        price_higher: { price: -1 },
        price_lower: { price: 1 },
        newest: { timestamp: -1 },
        oldest: { timestamp: 1 },
        name: { name: 1 }
    };

    const filterKeys = searchParams.get('filters')?.split(',') || [];
    const sort = filterKeys.map((cat) => cat.trim()).reduce((acc, key) => (sortOptions[key] ? { ...acc, ...sortOptions[key] } : acc), {});

    const filter = id ? { id } : categories ? { categories: { $in: categories.split(',').map((cat) => cat.trim()) } } : {};

    const collection = searchParams.get('type') === 'request' ? 'product_requests' : 'products';
    const data = await database.collection(collection).find(filter).sort(sort).toArray();

    return NextResponse.json(data, { status: 200 });
};

export const DELETE = async (request: NextRequest) => {
    const session = await findSession(request);

    if (!session) return new NextResponse(null, { status: 403 });

    const { searchParams } = new URL(request.url);

    const id = searchParams.get('id');
    const type = searchParams.get('type') || 'product';

    if (!id) return NextResponse.json({ error: 'شناسه محصول یا درخواست محصول ارائه نشده است.' }, { status: 400 });

    const collection = type === 'request' ? 'product_requests' : 'products';

    const document = await database.collection(collection).findOne({ id });

    if (!document) return NextResponse.json({ error: 'محصول یا درخواست محصول پیدا نشد.' }, { status: 404 });

    if (document.author.phone_number !== session.phone_number) return new NextResponse(null, { status: 403 });

    const result = await database.collection(collection).deleteOne({ id });

    if (result.deletedCount === 0) return NextResponse.json({ error: 'خطا در حذف محصول یا درخواست محصول.' }, { status: 500 });

    return NextResponse.json({ message: 'محصول یا درخواست محصول با موفقیت حذف شد.' }, { status: 200 });
};
