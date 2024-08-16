'use client';

import ProductViewLayout from '@/layouts/product-view';
import React from 'react';

export default function ({ params }: { params: { id: string } }) {
    return <ProductViewLayout type="product" id={params.id} />;
}
