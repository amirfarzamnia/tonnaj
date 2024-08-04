'use client';

import { ProductTypes } from '@/types/types';
import React from 'react';

const ShopContext = React.createContext<{ products: ProductTypes[]; setProducts: React.Dispatch<React.SetStateAction<ProductTypes[]>> }>({
    products: [
        {
            author: {
                name: 'سارا مرادی',
                phone_number: '09130288776'
            },
            images: ['/card.jpg'],
            id: 1,
            title: 'فروش سیب زمینی',
            description: 'خرید سیب زمینی...',
            category: 'سیب زمینی',
            min: 10,
            available: true,
            price: 7.5,
            rating: 4,
            timestamp: 302049290,
            location: {
                city: 'همدان',
                state: 'بهار'
            }
        },
        {
            author: {
                name: 'سارا مرادی',
                phone_number: '09130288776'
            },
            images: ['/card.jpg', '/card2.jpg'],
            id: 2,
            title: 'فروش سیب زمینی',
            description: 'خرید سیب زمینی...',
            category: 'سیب زمینی',
            available: true,
            price: 7.5,
            rating: 4,
            timestamp: 302049290,
            location: {
                city: 'همدان',
                state: 'بهار'
            }
        }
    ],
    setProducts: (): ProductTypes[] => []
});

export default function ShopProvider({ children }: { children: React.ReactNode }) {
    const [products, setProducts] = React.useState<ProductTypes[]>([
        {
            author: {
                name: 'سارا مرادی',
                phone_number: '09130288776'
            },
            images: ['/card.jpg', '/card.jpg'],
            id: 1,
            title: 'فروش سیب زمینی',
            description: 'خرید سیب زمینی...',
            category: 'سیب زمینی',
            available: true,
            price: 7.5,
            rating: 4,
            timestamp: 302049290,
            location: {
                city: 'همدان',
                state: 'بهار'
            }
        },
        {
            author: {
                name: 'سارا مرادی',
                phone_number: '09130288776'
            },
            images: ['/card.jpg', '/card2.jpg'],
            id: 2,
            title: 'فروش سیب زمینی',
            description: 'خرید سیب زمینی...',
            category: 'سیب زمینی',
            available: true,
            price: 7.5,
            rating: 4,
            timestamp: 302049290,
            location: {
                city: 'همدان',
                state: 'بهار'
            }
        }
    ]);

    return <ShopContext.Provider value={{ products, setProducts }}>{children}</ShopContext.Provider>;
}

export const useShop = () => React.useContext(ShopContext);
