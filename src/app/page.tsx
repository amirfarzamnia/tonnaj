'use client';

import { Grid, Typography, Box, CircularProgress, Button, CardContent, Card } from '@mui/material';
import { ShoppingBasket, Close, Inventory } from '@mui/icons-material';
import { ProductTypes, ProductRequestTypes } from '@/types/product';
import { Pagination, Scrollbar } from 'swiper/modules';
import ProductCard from '@/components/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import categories from '@/constants/categories';
import React from 'react';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css';

export default () => {
    const [productRequests, setProductRequests] = React.useState<ProductRequestTypes[]>([]);
    const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);
    const [products, setProducts] = React.useState<ProductTypes[]>([]);
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        (async () => {
            try {
                const urlParams = new URLSearchParams(location.search);
                const categories = urlParams.get('categories')?.split(',') || [];

                setSelectedCategories(categories);

                if (categories.length > 0) urlParams.set('categories', categories.join(','));

                const productsResponse = await fetch('/api/products?' + urlParams.toString());
                const productsData = await productsResponse.json();

                setProducts(productsData);

                const requestsResponse = await fetch('/api/products?type=request&' + urlParams.toString());
                const requestsData = await requestsResponse.json();

                setProductRequests(requestsData);
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

    if (error) return <Typography variant="h4">{error}</Typography>;

    return (
        <>
            <Box sx={{ height: '300px', backgroundImage: 'url("/banner-top.png")', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center', paddingRight: 4, borderRadius: 4 }}>
                <Box sx={{ mt: 10, mr: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Button endIcon={<Inventory />} href="/products/create" variant="contained" color="success" sx={{ display: 'flex', alignItems: 'center', gap: 1.25, width: 'fit-content' }}>
                        ثبت محصول
                    </Button>
                    <Button endIcon={<ShoppingBasket />} href="products/request" variant="contained" color="secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1.25, width: 'fit-content' }}>
                        درخواست محصول
                    </Button>
                </Box>
            </Box>
            <Box sx={{ marginBottom: 4, marginTop: 4 }}>
                <Typography variant="h4" sx={{ mb: 4 }}>
                    دسته بندی ها
                </Typography>
                <Grid container spacing={2}>
                    {categories.map((category) => (
                        <Grid item key={category}>
                            <Button
                                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                                variant={selectedCategories.includes(category) ? 'contained' : 'outlined'}
                                color={selectedCategories.includes(category) ? 'success' : 'info'}
                                onClick={() => {
                                    const categories = selectedCategories.includes(category) ? selectedCategories.filter((item) => item !== category) : [...selectedCategories, category];

                                    setSelectedCategories(categories);

                                    const urlParams = new URLSearchParams(location.search);

                                    if (categories.length > 0) {
                                        urlParams.set('categories', categories.join(','));
                                    } else {
                                        urlParams.delete('categories');
                                    }

                                    history.pushState(null, '', location.pathname + '?' + urlParams.toString());
                                }}
                                endIcon={selectedCategories.includes(category) && <Close />}>
                                {category}
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Typography variant="h4" sx={{ mb: 4 }}>
                محصولات
            </Typography>
            <Grid container spacing={3}>
                {products.map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </Grid>
            <Box sx={{ my: 4, px: 10, height: '230px', borderRadius: 4, background: '#feb204', display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%', justifyContent: 'center' }}>
                    <Typography variant="h6" color="black">
                        همین حالا محصولات خود را به صورت رایگان در تناژ ثبت کنید!
                    </Typography>
                    <Box>
                        <Button endIcon={<Inventory />} href="/products/create" variant="contained" color="success" sx={{ display: 'flex', alignItems: 'center', gap: 1.25, py: 0.82, width: 'fit-content' }}>
                            ثبت محصول
                        </Button>
                    </Box>
                </Box>
                <Box component={'img'} src="/banner-middle.png" sx={{ objectFit: 'cover', height: '230px', pb: 1 }} />
            </Box>
            <Typography variant="h4" sx={{ mb: 4, mt: 8 }}>
                درخواست های خرید محصول
            </Typography>
            <Swiper modules={[Pagination, Scrollbar]} slidesPerView={4} pagination={{ clickable: true }} scrollbar={{ draggable: true }}>
                {productRequests.map(({ id, author, description }) => (
                    <SwiperSlide key={id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '90%' }}>
                        <Card sx={{ width: 345 }} dir="rtl">
                            <CardContent>
                                <Typography gutterBottom variant="h5">
                                    {author.name}
                                </Typography>
                                <Typography variant="body2">{description}</Typography>
                            </CardContent>
                            <Box mt={1} mb={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Button href={`tel:${author.phone_number}`}>تماس با خریدار</Button>
                            </Box>
                        </Card>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};
