import React from 'react';

export type ProductTypes = {
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
    id: string;
    description: string;
    image: string;
    page: React.ReactNode;
    categories: string[];
};

export type AuthTypes = { phone_number?: string; verification_code?: string };
