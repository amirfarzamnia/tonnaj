'use client';

import { ArrowDownward, Person, ArrowUpward, Category, Telegram, WhatsApp, LocationOn, Tag, Star as StarIcon, StarBorder } from '@mui/icons-material';
import { Box, Button, Grid, Typography, Paper, Link, IconButton, CircularProgress } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ProductTypes } from '@/types/product';
import { Pagination } from 'swiper/modules';
import React from 'react';

import 'swiper/css/pagination';
import 'swiper/css';

export default ({ params }: { params: { id: string } }) => {
    const [relatedProducts, setRelatedProducts] = React.useState<ProductTypes[]>([]);
    const [product, setProduct] = React.useState<ProductTypes | null>(null);
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        if (!params.id) return;

        const fetchProductData = async () => {
            setLoading(true);

            try {
                const productResponse = await fetch(`/api/products?id=${params.id}`);

                if (!productResponse.ok) throw new Error('محصول مورد نظر یافت نشد.');

                const productData = (await productResponse.json())[0];

                setProduct(productData);

                const relatedProductsResponse = await fetch(`/api/products?categories=${productData.categories.join(',')}`);

                if (!relatedProductsResponse.ok) throw new Error('دریافت محصولات مشابه با خطا مواجه شد.');

                const relatedProductsData = await relatedProductsResponse.json();

                setRelatedProducts(relatedProductsData.filter(({ id }: ProductTypes) => id !== productData.id));
            } catch (e) {
                setError(e instanceof Error ? e.message : 'دریافت اطلاعات از دیتابیس با خطا مواجه شد.');
            } finally {
                setLoading(false);
            }
        };

        fetchProductData();
    }, [params.id]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) return <Typography variant="h4">{error}</Typography>;
    if (!product) return <Typography variant="h4">محصول مورد نظر یافت نشد</Typography>;

    const infoItems = [
        { icon: <Category />, label: 'دسته بندی ها', value: product.categories.join(', ') },
        { icon: <LocationOn />, label: 'موقعیت مکانی', value: `${product.location.city} - ${product.location.state}` },
        { icon: <ArrowDownward />, label: 'حداقل سفارش', value: product.min ?? 'ندارد' },
        { icon: <ArrowUpward />, label: 'حداکثر سفارش', value: product.max ?? 'ندارد' },
        { icon: <Person />, label: 'فروشنده', value: product.author.name },
        { icon: <Tag />, label: 'کد محصول', value: product.id },
        { icon: <StarIcon />, label: 'وضعیت', value: product.available ? 'موجود' : 'ناموجود' }
    ];

    return (
        <Box sx={{ padding: 3 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Swiper modules={[Pagination]} spaceBetween={10} slidesPerView={1} pagination={{ clickable: true }}>
                        {product.images.map((image, idx) => (
                            <SwiperSlide key={idx}>
                                <Box component="img" src={image} loading="lazy" alt={`Product image ${idx + 1}`} sx={{ width: '100%', height: '20rem', objectFit: 'cover' }} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ padding: 2, borderRadius: 2 }}>
                        <Typography variant="h4">{product.title}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>{Array.from({ length: 5 }, (_, index) => (index < product.rating ? <StarIcon key={index} color="primary" /> : <StarBorder key={index} color="primary" />))}</Box>
                        <Typography variant="h6" color="textSecondary" paragraph>
                            {product.description}
                        </Typography>
                        <Typography variant="h5" color="textPrimary">
                            قیمت: {product.price} تومان
                        </Typography>
                        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                            تماس با فروشنده
                        </Button>
                        <Box sx={{ mt: 2 }}>
                            {infoItems.map(({ icon, label, value }, index) => (
                                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <Box sx={{ mr: 1 }}>{icon}</Box>
                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                        {label}:{' '}
                                    </Typography>
                                    <Typography variant="body1" sx={{ ml: 1 }}>
                                        {value}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
            <Box sx={{ mt: 4 }}>
                <Typography variant="h6">محصولات مشابه</Typography>
                <Grid container spacing={2}>
                    {relatedProducts.map(({ id, images, title, description }) => (
                        <Grid item xs={12} sm={6} md={4} key={id}>
                            <Paper sx={{ padding: 2, borderRadius: 2, textAlign: 'center' }}>
                                <Box component="img" loading="lazy" src={images[0]} alt={title} sx={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                                <Typography variant="h6" sx={{ mt: 1 }}>
                                    {title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {description}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Link href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`برای مشاهده جزئیات ${product.title} به لینک زیر مراجعه کنید: https://tonnaj.com/products/${product.id}`)}`} target="_blank" sx={{ mr: 1 }}>
                    <IconButton color="primary">
                        <WhatsApp />
                    </IconButton>
                </Link>
                <Link href={`https://t.me/share/url?url=${encodeURIComponent(`https://tonnaj.com/products/${product.id}`)}&text=${encodeURIComponent(`مشاهده محصول ${product.title}`)}`} target="_blank">
                    <IconButton color="primary">
                        <Telegram />
                    </IconButton>
                </Link>
            </Box>
        </Box>
    );
};
