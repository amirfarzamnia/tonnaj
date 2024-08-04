import React from 'react';

export type ProductTypes = {
    rating: 1 | 2 | 3 | 4 | 5;
    categories: string[];
    description: string;
    available: boolean;
    timestamp: number;
    images: string[];
    title: string;
    price: string;
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
    page: React.ReactNode;
    categories: string[];
    description: string;
    title: string;
    image: string;
    id: string;
};

export type AuthTypes = { phone_number?: string; verification_code?: string };
