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
            author: 'نیما',
            pageTitle: 'سیب زمینی تازه موجود شد',
            image: '/card.jpg',
            id: '1',
            title: 'فروش سیب زمینی',
            locationName: 'شهدا',
            description: 'خرید سیب زمینی...',
            buttonHref: 'details',
            product_options: {
                product_type: 'سیب زمینی',
                mainLocation: 'همدان',
                childLocation: 'بهار',
                trade: 'تسویه بعذ از بارگیری',
                qualityGrade: 'صادراتی',
                source: 'داخلی',
                count: '100 تن',
                minimumOrder: false,
                seller: 'رکنی',
                productId: '1',
                condition: 'available',
                price: '7,500 تومان',
                rate: 4,
                timestamp: '302049290',
                timeupdate: '40953095390'
            }
        },
        {
            author: 'نیما',
            image: '/card.jpg',
            id: '1',
            title: 'فروش سیب زمینی',
            locationName: 'شهدا',
            description: 'خرید سیب زمینی...',
            buttonHref: 'details',
            product_options: {
                product_type: 'سیب زمینی',
                mainLocation: 'همدان',
                childLocation: 'بهار',
                trade: 'تسویه بعذ از بارگیری',
                qualityGrade: 'صادراتی',
                source: 'داخلی',
                count: '100 تن',
                minimumOrder: false,
                seller: 'رکنی',
                productId: '1',
                condition: 'available',
                price: '7,500 تومان',
                rate: 4,
                timestamp: '302049290',
                timeupdate: '40953095390'
            }
        },
        {
            author: 'نیما',
            image: '/card.jpg',
            id: '1',
            title: 'فروش سیب زمینی',
            locationName: 'شهدا',
            description: 'خرید سیب زمینی...',
            buttonHref: 'details',
            product_options: {
                product_type: 'سیب زمینی',
                mainLocation: 'همدان',
                childLocation: 'بهار',
                trade: 'تسویه بعذ از بارگیری',
                qualityGrade: 'صادراتی',
                source: 'داخلی',
                count: '100 تن',
                minimumOrder: false,
                seller: 'رکنی',
                productId: '1',
                condition: 'available',
                price: '7,500 تومان',
                rate: 4,
                timestamp: '302049290',
                timeupdate: '40953095390'
            }
        },
        {
            author: 'نیما',
            image: '/card.jpg',
            id: '1',
            title: 'فروش سیب زمینی',
            locationName: 'شهدا',
            description: 'خرید سیب زمینی...',
            buttonHref: 'details',
            product_options: {
                product_type: 'سیب زمینی',
                mainLocation: 'همدان',
                childLocation: 'بهار',
                trade: 'تسویه بعذ از بارگیری',
                qualityGrade: 'صادراتی',
                source: 'داخلی',
                count: '100 تن',
                minimumOrder: false,
                seller: 'رکنی',
                productId: '1',
                condition: 'available',
                price: '7,500 تومان',
                rate: 4,
                timestamp: '302049290',
                timeupdate: '40953095390'
            }
        }
    ],
    setCartItems: (): CartTypes[] => []
});

export default function ShopProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartTypes[]>([
        {
            author: 'نیما',
            image: '/card.jpg',
            pageTitle: 'سیب زمینی تازه موجود شد',
            id: '1',
            title: 'فروش سیب زمینی',
            locationName: 'شهدا',
            description: 'خرید سیب زمینی...',
            buttonHref: 'details',
            product_options: {
                product_type: 'سیب زمینی',
                mainLocation: 'همدان',
                childLocation: 'بهار',
                trade: 'تسویه بعذ از بارگیری',
                qualityGrade: 'صادراتی',
                source: 'داخلی',
                count: '100 تن',
                minimumOrder: false,
                seller: 'رکنی',
                productId: '1',
                condition: 'available',
                price: '7,500 تومان',
                rate: 4,
                timestamp: '302049290',
                timeupdate: '40953095390'
            }
        },
        {
            author: 'نیما',
            image: '/card.jpg',
            id: '1',
            title: 'فروش سیب زمینی',
            locationName: 'شهدا',
            description: 'خرید سیب زمینی...',
            buttonHref: 'details',
            product_options: {
                product_type: 'سیب زمینی',
                mainLocation: 'همدان',
                childLocation: 'بهار',
                trade: 'تسویه بعذ از بارگیری',
                qualityGrade: 'صادراتی',
                source: 'داخلی',
                count: '100 تن',
                minimumOrder: false,
                seller: 'رکنی',
                productId: '1',
                condition: 'available',
                price: '7,500 تومان',
                rate: 4,
                timestamp: '302049290',
                timeupdate: '40953095390'
            }
        },
        {
            author: 'نیما',
            image: '/card.jpg',
            id: '1',
            title: 'فروش سیب زمینی',
            locationName: 'شهدا',
            description: 'خرید سیب زمینی...',
            buttonHref: 'details',
            product_options: {
                product_type: 'سیب زمینی',
                mainLocation: 'همدان',
                childLocation: 'بهار',
                trade: 'تسویه بعذ از بارگیری',
                qualityGrade: 'صادراتی',
                source: 'داخلی',
                count: '100 تن',
                minimumOrder: false,
                seller: 'رکنی',
                productId: '1',
                condition: 'available',
                price: '7,500 تومان',
                rate: 4,
                timestamp: '302049290',
                timeupdate: '40953095390'
            }
        },
        {
            author: 'نیما',
            image: '/card.jpg',
            id: '1',
            title: 'فروش سیب زمینی',
            locationName: 'شهدا',
            description: 'خرید سیب زمینی...',
            buttonHref: 'details',
            product_options: {
                product_type: 'سیب زمینی',
                mainLocation: 'همدان',
                childLocation: 'بهار',
                trade: 'تسویه بعذ از بارگیری',
                qualityGrade: 'صادراتی',
                source: 'داخلی',
                count: '100 تن',
                minimumOrder: false,
                seller: 'رکنی',
                productId: '1',
                condition: 'available',
                price: '7,500 تومان',
                rate: 4,
                timestamp: '302049290',
                timeupdate: '40953095390'
            }
        }
    ]);

    return <ShopContext.Provider value={{ cartItems, setCartItems }}>{children}</ShopContext.Provider>;
}

export const useShop = () => useContext(ShopContext);
