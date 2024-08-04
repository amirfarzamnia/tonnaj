export type ProductTypes = {
    rating: 1 | 2 | 3 | 4 | 5;
    categories: string[];
    description: string;
    available: boolean;
    timestamp: number;
    images: {
        name: string;
        base64: string;
    }[];
    title: string;
    price: string;
    min?: number;
    max?: number;
    id: string;
    location: {
        state: string;
        city: string;
    };
    author: {
        phone_number: string;
        name: string;
    };
};
