export type CartTypes = {
    title?: string;
    pageTitle?: string;
    id: string;
    image: string[];
    author?: string;
    locationName?: string;
    description?: string;
    buttonHref?: string;
    product_type?: string;
    mainLocation?: string;
    childLocation?: string;
    trade?: string;
    qualityGrade?: string;
    source?: string;
    count?: string;
    minimumOrder?: boolean;
    seller?: string;
    productId?: string;
    condition?: 'available' | 'unavailable';
    price?: string;
    rating?: 0 | 1 | 2 | 3 | 4 | 5;
    timestamp?: Date | string;
};

export type AuthTypes = {
    phone_number?: string;
    verification_code?: string;
};
