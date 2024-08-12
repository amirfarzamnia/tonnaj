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
    author: Omit<AuthTypes, 'verification_code'>;
}

export type ProductTypes = ProductBase & {
    unit_of_measurement: string;
    stock_quantity: number;
    images: string[];
    minimum: number;
    price: number;
    name: string;
};

export type ProductRequestTypes = ProductBase;
