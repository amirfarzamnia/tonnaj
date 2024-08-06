'use client';

import { Grid, Typography, Box, Card, CardContent, CardMedia, CircularProgress, Divider, Button } from '@mui/material';
import { Phone, Sell, ShoppingBasket, Close } from '@mui/icons-material';
import { Swiper, SwiperSlide } from 'swiper/react';
import categories from '@/constants/categories';
import { ProductTypes } from '@/types/product';
import { Pagination } from 'swiper/modules';
import Link from 'next/link';
import React from 'react';

import 'swiper/css/pagination';
import 'swiper/css';

export default () => {
    const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);
    const [products, setProducts] = React.useState<ProductTypes[]>([]);
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        (async () => {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const selected = urlParams.get('categories')?.split(',') || [];

                setSelectedCategories(selected);

                if (selected.length > 0) urlParams.set('categories', selected.join(','));

                const response = await fetch('/api/products?' + urlParams.toString());
                const data = await response.json();

                setProducts(data);
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
            <Box sx={{ 'height': '300px', 'backgroundImage': 'url("/banner.jpeg")', 'backgroundSize': 'cover', 'backgroundPosition': 'center', 'position': 'relative', 'display': 'flex', 'flexDirection': 'column', 'alignItems': 'start', 'justifyContent': 'center', 'paddingRight': 4, 'borderRadius': 4, '::before': { content: '""', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.25)', borderRadius: 'inherit' } }}>
                <Typography variant="h6" color="white" gutterBottom>
                    تناژ، بزرگترین سایت خرید و فروش عمده در کشور
                </Typography>
                <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Button href="products/create" startIcon={<Sell />} variant="contained" color="success" sx={{ borderRadius: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                        ثبت محصول
                    </Button>
                    <Button href="products/request" startIcon={<ShoppingBasket />} variant="contained" color="secondary" sx={{ borderRadius: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
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

                                    const urlParams = new URLSearchParams(window.location.search);

                                    if (categories.length > 0) {
                                        urlParams.set('categories', categories.join(','));
                                    } else {
                                        urlParams.delete('categories');
                                    }

                                    window.history.pushState(null, '', window.location.pathname + '?' + urlParams.toString());
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
                {products.map(({ price, description, images, title, id, author, categories, location }) => (
                    <Grid item xs={12} sm={6} md={3} key={id}>
                        <Link href={'/products/' + id} passHref style={{ textDecoration: 'none' }}>
                            <Card>
                                <Swiper modules={[Pagination]} spaceBetween={10} slidesPerView={1} pagination={{ clickable: true }}>
                                    {images.map((image, index) => (
                                        <SwiperSlide key={index}>
                                            <CardMedia component="img" loading="lazy" src={image} alt={`${title} (تصویر شماره ${index + 1})`} sx={{ height: '200px', objectFit: 'cover' }} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom textAlign="center">
                                        {title} در {location.city}
                                    </Typography>
                                    <Box sx={{ my: 2 }}>
                                        <Divider />
                                    </Box>
                                    <Typography variant="body1" color="textSecondary" gutterBottom>
                                        {description.slice(0, 165)}...
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" gutterBottom sx={{ mt: 2, fontSize: 'small' }}>
                                        به قیمت {price} تومان
                                    </Typography>
                                    <Button endIcon={<Phone />} href={'tel:' + author.phone_number} variant="outlined" color="success" sx={{ mt: 2, width: '100%', py: 2, display: 'flex', alignItems: 'center', gap: 1, borderRadius: 1 }} onClick={(event) => event.stopPropagation()}>
                                        تماس با فروشنده
                                    </Button>
                                    <Box sx={{ my: 2 }}>
                                        <Divider />
                                    </Box>
                                    <Typography variant="body2" color="textSecondary">
                                        {categories.map((category, index) => (
                                            <Box component="small" key={index}>
                                                {category}
                                            </Box>
                                        ))}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};
