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
            author: 'رکنی',
            image: ['/card.jpg'],
            pageTitle: 'سیب زمینی تازه موجود شد',
            id: '1',
            title: 'فروش سیب زمینی',
            description: 'خرید سیب زمینی...',
            buttonHref: 'details',
            product_type: 'سیب زمینی',
            trade: 'تسویه بعذ از بارگیری',
            quality_grade: 'صادراتی',
            source: 'داخلی',
            count: '100 تن',
            minimum_order: false,
            condition: true,
            price: 7.5,
            rating: 4,
            timestamp: '302049290',
            location: {
                city: 'همدان',
                state: 'بهار'
            }
        },
        {
            author: 'رکنی',
            image: ['/card.jpg', '/card2.jpg'],
            pageTitle: 'سیب زمینی تازه موجود شد',
            id: '2',
            title: 'فروش سیب زمینی',
            description: 'خرید سیب زمینی...',
            buttonHref: 'details',
            product_type: 'سیب زمینی',
            trade: 'تسویه بعذ از بارگیری',
            quality_grade: 'صادراتی',
            source: 'داخلی',
            count: '100 تن',
            minimum_order: false,
            condition: true,
            price: 7.5,
            rating: 4,
            timestamp: '302049290',
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
            author: 'رکنی',
            image: ['/card.jpg'],
            pageTitle: 'سیب زمینی تازه موجود شد',
            id: '1',
            title: 'فروش سیب زمینی',
            description: 'خرید سیب زمینی...',
            buttonHref: 'details',
            product_type: 'سیب زمینی',
            trade: 'تسویه بعذ از بارگیری',
            quality_grade: 'صادراتی',
            source: 'داخلی',
            count: '100 تن',
            minimum_order: false,
            condition: true,
            price: 7.5,
            rating: 4,
            timestamp: '302049290',
            location: {
                city: 'همدان',
                state: 'بهار'
            }
        },
        {
            author: 'رکنی',
            image: ['/card.jpg', '/card2.jpg'],
            pageTitle: 'سیب زمینی تازه موجود شد',
            id: '2',
            title: 'فروش سیب زمینی',
            description: 'خرید سیب زمینی...',
            buttonHref: 'details',
            product_type: 'سیب زمینی',
            trade: 'تسویه بعذ از بارگیری',
            quality_grade: 'صادراتی',
            source: 'داخلی',
            count: '100 تن',
            minimum_order: false,
            condition: true,
            price: 7.5,
            rating: 4,
            timestamp: '302049290',
            location: {
                city: 'همدان',
                state: 'بهار'
            }
        }
    ]);

    return <ShopContext.Provider value={{ cartItems, setCartItems }}>{children}</ShopContext.Provider>;
}

export const useShop = () => useContext(ShopContext);
