import { AuthTypes } from './auth';
import { LatLng } from 'leaflet';

interface ProductBase {
    categories: string[];
    description: string;
    available: boolean;
    timestamp: number;
    id: string;
    location: {
        latlng: LatLng;
        state: string;
        city: string;
    };
    author: {
        phone_number: AuthTypes['phone_number'];
        name: AuthTypes['name'];
    };
}

export type ProductTypes = ProductBase & {
    images: string[];
    rating: number;
    price: number;
    name: string;
};

export type ProductRequestTypes = ProductBase;
