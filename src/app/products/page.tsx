'use client';

import { Grid, Typography, Box, CircularProgress, Button } from '@mui/material';
import ProductCard from '@/components/ProductCard';
import { ProductTypes } from '@/types/product';
import React from 'react';

export default () => {
    const [products, setProducts] = React.useState<ProductTypes[]>([]);
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        (async () => {
            setLoading(true);

            try {
                const productsResponse = await fetch('/api/products?filters=newest');
                const productsData = await productsResponse.json();

                setProducts(productsData);
            } catch {
                setError('دریافت اطلاعات از دیتابیس با خطا مواجه شد.');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!products.length) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant="h4">محصولی یافت نشد</Typography>
                <Button href="/" color="primary" variant="outlined">
                    بازگشت به صفحه اصلی
                </Button>
            </Box>
        );
    }

    if (error) return <Typography variant="h4">{error}</Typography>;

    return (
        <Grid container spacing={3}>
            {products.map((product) => (
                <ProductCard key={product.id} {...product} />
            ))}
        </Grid>
    );
};
