import { LatLng } from 'leaflet';

export type ProductTypes = {
    categories: string[];
    description: string;
    available: boolean;
    timestamp: number;
    images: string[];
    rating: number;
    price: string;
    name: string;
    min?: number;
    max?: number;
    id: string;
    location: {
        latlng: LatLng;
        state: string;
        city: string;
    };
    author: {
        phone_number: string;
        name: string;
    };
};
