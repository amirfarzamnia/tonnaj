'use client';

import ProductViewLayout from '@/layouts/product-view';
import React from 'react';

export default ({ params }: { params: { id: string } }) => <ProductViewLayout type="request" id={params.id} />;
