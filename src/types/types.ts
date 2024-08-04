import { ReactNode } from 'react';

export type CartTypes = {
    rating: 1 | 2 | 3 | 4 | 5;
    description: string;
    available: boolean;
    timestamp: number;
    images: string[];
    category: string;
    author: string;
    title: string;
    count: number;
    price: number;
    min?: number;
    max?: number;
    id: number;
    location: {
        city: string;
        state: string;
    };
};

export type BlogTypes = {
    blog_page: ReactNode;
    description: string;
    image: string;
    id: string;
};

export type AuthTypes = { phone_number: string } | { phone_number: string; verification_code: string };
