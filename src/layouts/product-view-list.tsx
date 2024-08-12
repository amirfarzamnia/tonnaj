'use client';

import { Grid, Typography, Box, CircularProgress, Button } from '@mui/material';
import ProductRequestCard from '@/components/product-request-card';
import { ShoppingBasket, Inventory } from '@mui/icons-material';
import ProductCard from '@/components/product-card';
import categories from '@/constants/categories';
import { MenuItem } from 'primereact/menuitem';
import { ProductTypes } from '@/types/product';
import { MegaMenu } from 'primereact/megamenu';
import React from 'react';

const model = Object.entries(categories).reduce<MenuItem[]>((acc, [label, items]) => (acc.push({ label, items: Object.entries(items).map(([label, items]) => ({ label, items: items.map((label) => ({ label, url: '?categories=' + label })) })) }), acc), []);

export default ({ type }: { type: 'product' | 'request' }) => {
    const [products, setProducts] = React.useState<ProductTypes[]>([]);
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [hasMore, setHasMore] = React.useState<boolean>(true);
    const [start, setStart] = React.useState<number>(0);
    const isFetching = React.useRef<boolean>(false);

    const fetchProducts = async (start: number, end: number) => {
        if (isFetching.current) return;

        isFetching.current = true;

        try {
            const response = await fetch('/api/products?type=' + type + '&start=' + start + '&end=' + end);
            const data = await response.json();

            if (data.length > 0) {
                setProducts((prevProducts) => [...prevProducts, ...data]);
                setStart(end);
            } else {
                setHasMore(false);
            }
        } catch {
            setError('دریافت اطلاعات از دیتابیس با خطا مواجه شد.');
        } finally {
            isFetching.current = false;

            setLoading(false);
        }
    };

    React.useEffect(() => {
        setLoading(true);
        fetchProducts(0, 10);
    }, []);

    React.useEffect(() => {
        const handleScroll = () => innerHeight + scrollY >= document.body.offsetHeight - 500 && hasMore && !loading && fetchProducts(start, start + 10);

        addEventListener('scroll', handleScroll);

        return () => removeEventListener('scroll', handleScroll);
    }, [start, hasMore, loading]);

    if (loading && start === 0) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) return <Typography variant="h4">{error}</Typography>;

    return (
        <>
            <Box sx={{ border: 1, borderColor: 'grey.600', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)', my: 4, px: 10, height: '230px', borderRadius: 4, background: '#feb204', display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%', justifyContent: 'center' }}>
                    <Typography variant="h6" color="black" fontWeight="bold">
                        {type === 'product' ? 'شما در این بخش میتوانید محصولات موجود در تناژ را مشاهده کنید.' : 'شما در این بخش میتوانید محصولات درخواستی در تناژ را مشاهده کنید.'}
                    </Typography>
                    <Box>
                        <Button size="large" endIcon={type === 'product' ? <Inventory /> : <ShoppingBasket />} href={'/products/' + (type === 'product' ? 'create' : 'request')} variant="contained" color={type === 'product' ? 'success' : 'secondary'} sx={{ display: 'flex', alignItems: 'center', gap: 1.25, py: 0.82, width: 'fit-content' }}>
                            {type === 'product' ? 'شماهم محصول خود را ثبت کنید' : 'شماهم محصول مورد نظر خود را درخواست کنید'}
                        </Button>
                    </Box>
                </Box>
                <Box component="img" src="/images/pages/products/banner.png" sx={{ objectFit: 'cover', height: '230px', pb: 0.25 }} />
            </Box>
            {!products.length && !loading ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, justifyContent: 'center', alignItems: 'center', height: '40vh' }}>
                    <Typography variant="h4">محصولی یافت نشد</Typography>
                    <Button href="/" color="primary" variant="outlined">
                        بازگشت به صفحه اصلی
                    </Button>
                </Box>
            ) : (
                <>
                    <Box sx={{ mb: 4 }}>
                        <MegaMenu model={model} />
                    </Box>
                    <Grid container spacing={3}>
                        {products.map((product) => (
                            <Grid item xs={12} sm={6} md={3} key={product.id}>
                                {type === 'product' ? <ProductCard {...product} /> : <ProductRequestCard {...product} />}
                            </Grid>
                        ))}
                    </Grid>
                    {loading && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2 }}>
                            <CircularProgress />
                        </Box>
                    )}
                </>
            )}
        </>
    );
};
