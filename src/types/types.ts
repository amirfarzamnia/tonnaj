import { ReactNode } from 'react';

export type ProductTypes = {
    rating: 1 | 2 | 3 | 4 | 5;
    description: string;
    available: boolean;
    timestamp: number;
    images: string[];
    categories: string[];
    title: string;
    price: number;
    min?: number;
    max?: number;
    id: number;
    location: {
        state: string;
        city: string;
    };
    author: {
        phone_number: string;
        name: string;
    };
};

export type BlogTypes = {
    blog_page: ReactNode;
    description: string;
    image: string;
    id: string;
};

export type AuthTypes = { phone_number: string } | { phone_number: string; verification_code: string };
