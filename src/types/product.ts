import { AuthTypes } from './auth';
import { LatLng } from 'leaflet';

interface ProductBase {
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

export interface ProductTypes extends ProductBase {
    categories: string[];
    description: string;
    images: string[];
    rating: number;
    price: number;
    name: string;
}

export interface ProductRequestTypes extends ProductBase {
    description: string;
}
