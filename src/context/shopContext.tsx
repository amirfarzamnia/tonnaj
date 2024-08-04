'use client';

import { CartTypes } from '@/types/types';
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

interface ShopContextProps {
    cartItems: CartTypes[];
    setCartItems: Dispatch<SetStateAction<CartTypes[]>>;
}

const ShopContext = createContext<ShopContextProps>({
    cartItems: [
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
    setCartItems: (): CartTypes[] => []
});

export default function ShopProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartTypes[]>([
        {
            author: '09130288776',
            images: ['/card.jpg'],
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

    return <ShopContext.Provider value={{ cartItems, setCartItems }}>{children}</ShopContext.Provider>;
}

export const useShop = () => useContext(ShopContext);
