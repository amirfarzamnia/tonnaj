import { ProductTypes, ProductRequestTypes } from '@/types/product';
import { NextResponse, NextRequest } from 'next/server';
import stringSimilarity from 'string-similarity-js';
import findSession from '@/functions/find-session';
import categories from '@/constants/categories';
import { randomBytes } from 'node:crypto';
import { database } from '@/mongodb';

export const POST = async (request: NextRequest) => {
    const { product, product_request, method }: { product?: ProductTypes; product_request?: ProductRequestTypes; method: string } = await request.json();
    const session = await findSession(request);

    if (!session) return new NextResponse(null, { status: 403 });

    const entity = { create: product, request: product_request }[method];

    if (!entity) return NextResponse.json({ error: 'پارامتر محصول یا درخواست محصول ارسال نشده.' }, { status: 400 });

    const id = randomBytes(3).toString('hex');

    if (!entity.categories.length) return NextResponse.json({ error: 'باید حداقل یک دسته بندی برای محصول خود انتخاب کنید.' }, { status: 400 });

    if (!Array.isArray(entity.categories) || entity.categories.some((category) => !Object.values(categories).flatMap(Object.values).flat().includes(category))) return NextResponse.json({ error: 'دسته بندی ها به درستی ارسال نشده اند.' }, { status: 400 });

    if (entity.categories.length > 5) return NextResponse.json({ error: 'نمیتوانید بیشتر از 5 دسته بندی را برای محصول خود انتخاب کنید.' }, { status: 400 });

    if (typeof entity.description !== 'string' || !entity.description.length) return NextResponse.json({ error: 'لطفا توضیحات محصول را وارد کنید.' }, { status: 400 });

    if (!entity.location.city.length || !entity.location.province.length) return NextResponse.json({ error: 'لطفا موقعیت مکانی خود را به درستی انتخاب کنید.' }, { status: 400 });

    if (method === 'create') {
        const prod = entity as ProductTypes;

        if (!Array.isArray(prod.images) || !prod.images.length) return NextResponse.json({ error: 'باید حداقل یک عکس از محصول خود بارگذاری کنید.' }, { status: 400 });

        if (prod.images.length >= 3) return NextResponse.json({ error: 'نمیتوانید بیشتر از 3 عکس برای محصول خود آپلود کنید.' }, { status: 400 });

        if (typeof prod.price !== 'number') return NextResponse.json({ error: 'قیمت محصول نادرست است.' }, { status: 400 });

        if (typeof prod.name !== 'string' || !prod.name.length) return NextResponse.json({ error: 'لطفا نام محصول را وارد کنید.' }, { status: 400 });

        if (typeof prod.stock_quantity !== 'number') return NextResponse.json({ error: 'میزان موجودی محصول نادرست است.' }, { status: 400 });

        if (typeof prod.minimum !== 'number') return NextResponse.json({ error: 'میزان حداقل خرید محصول بسیار کم یا بسیار زیاد است.' }, { status: 400 });
    }

    await database.collection(method === 'create' ? 'products' : 'product_requests').insertOne({ ...entity, id, timestamp: Date.now(), author: session, available: false });

    return NextResponse.json({ message: method === 'create' ? 'محصول شما با موفقیت به تناژ اضافه شد و پس از تایید ادمین نمایش داده خواهد شد.' : 'درخواست خرید محصول شما با موفقیت به تناژ اضافه شد و پس از تایید ادمین نمایش داده خواهد شد.', id }, { status: 200 });
};

export const GET = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);

    const id = searchParams.get('id');
    const search = searchParams.get('search');
    const cats = searchParams.get('categories');

    const sortOptions: Record<string, Record<string, 1 | -1>> = {
        newest: { timestamp: -1 },
        oldest: { timestamp: 1 },
        expensive: { price: -1 },
        cheapest: { price: 1 }
    };

    const start = parseInt(searchParams.get('start') || '0', 10);
    const end = parseInt(searchParams.get('end') || '10', 10);

    const collectionRef = database.collection(searchParams.get('type') === 'request' ? 'product_requests' : 'products');
    const dbQuery: any = { available: true };

    if (id) {
        dbQuery.id = id;
    } else if (cats) {
        const subcategories: string[] = [cats.trim()];

        // @ts-ignore
        for (const main in categories) for (const sub in categories[main]) if ([main, sub].includes(cats.trim())) subcategories.push(...categories[main][sub]);

        dbQuery.categories = { $in: subcategories };
    }

    if (search) {
        const allDocuments = await collectionRef.find(dbQuery).toArray();
        const scoredResults = allDocuments.map((doc: any) => ({ doc, score: Object.keys(doc).reduce((acc, key) => (typeof doc[key] === 'string' ? acc + stringSimilarity(search, doc[key]) : acc), 0) }));
        const filteredAndSortedResults = scoredResults.filter(({ score }) => score > 0).sort((a, b) => b.score - a.score);

        return NextResponse.json(filteredAndSortedResults.map(({ doc }) => doc).slice(start, end), { status: 200 });
    }

    const sortedQuery = collectionRef.find(dbQuery).sort((searchParams.get('filters')?.split(',') || []).map((cat) => cat.trim()).reduce((acc, key) => (sortOptions[key] ? { ...acc, ...sortOptions[key] } : acc), {}));

    const paginatedQuery = sortedQuery.skip(start).limit(end - start);
    const data = await paginatedQuery.toArray();

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
