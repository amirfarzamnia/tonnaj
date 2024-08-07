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
        phone_number: string;
        name: string;
    };
};
