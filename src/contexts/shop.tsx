'use client';

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';
import { ProductTypes } from '@/types/types';

const ShopContext = createContext<{ products: ProductTypes[]; setProducts: Dispatch<SetStateAction<ProductTypes[]>> }>({
    products: [
        {
            author: '09130288776',
            images: ['/card.jpg'],
            id: 1,
            title: 'فروش سیب زمینی',
            description: 'خرید سیب زمینی...',
            category: 'سیب زمینی',
            count: 100,
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
            author: '09130288776',
            images: ['/card.jpg', '/card2.jpg'],
            id: 2,
            title: 'فروش سیب زمینی',
            description: 'خرید سیب زمینی...',
            category: 'سیب زمینی',
            count: 100,
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

export default function ShopProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<ProductTypes[]>([
        {
            author: '09130288776',
            images: ['/card.jpg', '/card.jpg'],
            id: 1,
            title: 'فروش سیب زمینی',
            description: 'خرید سیب زمینی...',
            category: 'سیب زمینی',
            count: 100,
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
            author: '09130288776',
            images: ['/card.jpg', '/card2.jpg'],
            id: 2,
            title: 'فروش سیب زمینی',
            description: 'خرید سیب زمینی...',
            category: 'سیب زمینی',
            count: 100,
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

export const useShop = () => useContext(ShopContext);
