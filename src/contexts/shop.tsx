'use client';

import { ProductTypes } from '@/types/product';
import React, { useEffect, useState } from 'react';

const ShopContext = React.createContext<{ products: ProductTypes[]; setProducts: React.Dispatch<React.SetStateAction<ProductTypes[]>>; loading: boolean }>({
    products: [],
    setProducts: (): ProductTypes[] => [],
    loading: true,
});

export default function ShopProvider({ children }: { children: React.ReactNode }) {
    const [products, setProducts] = React.useState<ProductTypes[]>([]);
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        const request = async () => {
            const res = await fetch('/api/product', { method: "GET" })
            const json = await res.json()

            setProducts(json.data)
            setLoading(false)
        }

        request()
    }, [])

    return <ShopContext.Provider value={{ products, setProducts, loading }}>{children}</ShopContext.Provider>;
}

export const useShop = () => React.useContext(ShopContext);
