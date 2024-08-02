'use client';

import { CartTypes } from '@/types/types';
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

interface ShopContextProps {
    cartItems: CartTypes[];
    setCartItems: Dispatch<SetStateAction<CartTypes[]>>;
}

const ShopContext = createContext<ShopContextProps>({
    cartItems: [
        { author: 'نیما', image: '/card.jpg', id: '1', title: 'فروش سیب زمینی', locationName: 'شهدا', description: 'خرید سیب زمینی...', buttonHref: 'details' },

        { author: 'نیما', image: '/card.jpg', id: '2', title: 'فروش سیب زمینی', locationName: 'شهدا', description: 'خرید سیب زمینی...', buttonHref: 'details' },
        { author: 'نیما', image: '/card.jpg', id: '3', title: 'فروش سیب زمینی', locationName: 'شهدا', description: 'خرید سیب زمینی...', buttonHref: 'details' },
        { author: 'نیما', image: '/card.jpg', id: '4', title: 'فروش سیب زمینی', locationName: 'شهدا', description: 'خرید سیب زمینی...', buttonHref: 'details' },
        { author: 'نیما', image: '/card.jpg', id: '5', title: 'فروش سیب زمینی', locationName: 'شهدا', description: 'خرید سیب زمینی...', buttonHref: 'details' }
    ],
    setCartItems: (): CartTypes[] => []
});

export default function ShopProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartTypes[]>([
        { author: 'نیما', image: '/card.jpg', id: '1', title: 'فروش سیب زمینی', locationName: 'شهدا', description: 'خرید سیب زمینی...', buttonHref: 'details' },

        { author: 'نیما', image: '/card.jpg', id: '2', title: 'فروش سیب زمینی', locationName: 'شهدا', description: 'خرید سیب زمینی...', buttonHref: 'details' },
        { author: 'نیما', image: '/card.jpg', id: '3', title: 'فروش سیب زمینی', locationName: 'شهدا', description: 'خرید سیب زمینی...', buttonHref: 'details' },
        { author: 'نیما', image: '/card.jpg', id: '4', title: 'فروش سیب زمینی', locationName: 'شهدا', description: 'خرید سیب زمینی...', buttonHref: 'details' },
        { author: 'نیما', image: '/card.jpg', id: '5', title: 'فروش سیب زمینی', locationName: 'شهدا', description: 'خرید سیب زمینی...', buttonHref: 'details' }
    ]);

    return <ShopContext.Provider value={{ cartItems, setCartItems }}>{children}</ShopContext.Provider>;
}

export const useShop = () => useContext(ShopContext);
