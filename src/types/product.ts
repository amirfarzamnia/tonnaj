export type ProductTypes = {
    categories: string[];
    description: string;
    available: boolean;
    timestamp: number;
    images: string[];
    rating: number;
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
