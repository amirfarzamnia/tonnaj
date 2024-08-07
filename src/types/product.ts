import { AuthTypes } from './auth';
import { LatLng } from 'leaflet';

export type ProductTypes = {
    categories: string[];
    description: string;
    available: boolean;
    timestamp: number;
    images: string[];
    rating: number;
    price: number;
    name: string;
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
};

export type ProductRequestTypes = {
    description: string;
    available: boolean;
    timestamp: number;
    id: string;
    author: {
        phone_number: AuthTypes['phone_number'];
        name: AuthTypes['name'];
    };
};
