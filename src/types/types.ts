export type CartTypes = {
    title?: string;
    pageTitle?: string;
    id: string;
    image: string[];
    author?: string;
    description?: string;
    buttonHref?: string;
    product_type?: string;
    trade?: string;
    quality_grade?: string;
    source?: string;
    count?: string;
    minimum_order?: boolean;
    condition?: boolean;
    price?: number;
    rating?: 0 | 1 | 2 | 3 | 4 | 5;
    timestamp?: string;
    location: {
        city: string;
        state: string;
    };
};

export type AuthTypes = { phone_number: string } | { phone_number: string; verification_code: string };
