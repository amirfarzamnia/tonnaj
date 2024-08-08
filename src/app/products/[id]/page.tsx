'use client';

import { Box, Button, Grid, Typography, Card, Link, IconButton, CircularProgress, Divider } from '@mui/material';
import { Person, Category, Telegram, WhatsApp, LocationOn, Tag, Star, Phone } from '@mui/icons-material';
import ProductCard from '@/components/ProductCard';
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

        (async () => {
            setLoading(true);

            try {
                const productResponse = await fetch('/api/products?id=' + params.id);

                if (!productResponse.ok) throw new Error('محصول مورد نظر یافت نشد.');

                const productData = (await productResponse.json())[0];

                setProduct(productData);

                const relatedProductsResponse = await fetch('/api/products?categories=' + productData.categories.join(','));

                if (!relatedProductsResponse.ok) throw new Error('دریافت محصولات مشابه با خطا مواجه شد.');

                const relatedProductsData = await relatedProductsResponse.json();

                setRelatedProducts(relatedProductsData.filter(({ id }: ProductTypes) => id !== productData.id));
            } catch (e) {
                setError(e instanceof Error ? e.message : 'دریافت اطلاعات از دیتابیس با خطا مواجه شد.');
            } finally {
                setLoading(false);
            }
        })();
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
        { icon: <Person />, label: 'فروشنده', value: product.author.name },
        { icon: <Tag />, label: 'کد محصول', value: product.id },
        { icon: <Star />, label: 'وضعیت', value: product.available ? 'موجود' : 'ناموجود' }
    ];

    return (
        <Box sx={{ padding: 3 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Swiper modules={[Pagination]} spaceBetween={10} slidesPerView={1} pagination={{ clickable: true }}>
                        {product.images.map((image, idx) => (
                            <SwiperSlide key={idx}>
                                <Box component="img" src={image} loading="lazy" alt={`تصویر شماره ${idx + 1}`} sx={{ width: '100%', height: '20rem', objectFit: 'cover', borderRadius: 4 }} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <Typography variant="h6" color="textSecondary" paragraph>
                        <Card sx={{ padding: 2, borderRadius: 4 }}>{product.description}</Card>
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card sx={{ padding: 2, borderRadius: 4 }}>
                        <Typography variant="h4">{product.name}</Typography>
                        <Typography sx={{ my: 2 }} variant="h6" color="textPrimary">
                            قیمت: {product.price} تومان
                        </Typography>
                        <Button endIcon={<Phone />} href={'tel:' + product.author.phone_number} variant="outlined" color="success" sx={{ mt: 2, width: '100%', py: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                            تماس با فروشنده
                        </Button>
                        <Box sx={{ my: 2 }}>
                            <Divider />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            {infoItems.map(({ icon, label, value }, index) => (
                                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1, background: 'rgba(0, 0, 0, 0.05)', p: 1, borderRadius: 1 }}>
                                    <Box sx={{ ml: 1 }}>{icon}</Box>
                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                        {label}: {value}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                        <Box sx={{ my: 2 }}>
                            <Divider />
                        </Box>
                        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'space-between' }}>
                            <Typography variant="h6" color="textPrimary" sx={{ textWrap: 'nowrap' }}>
                                اشتراک گذاری
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Link href={`https://api.whatsapp.com/send?text=${encodeURIComponent(product.description + '\n\nمشاهده محصول در تناژ:\n\n' + location.origin + '/products/' + product.id)}`} target="_blank" sx={{ mr: 1 }}>
                                    <IconButton color="success">
                                        <WhatsApp />
                                    </IconButton>
                                </Link>
                                <Link href={`https://t.me/share/url?url=${encodeURIComponent(location.origin + '/products/' + product.id)}&text=${encodeURIComponent(product.description)}`} target="_blank">
                                    <IconButton color="success">
                                        <Telegram />
                                    </IconButton>
                                </Link>
                            </Box>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
            {relatedProducts.length > 0 && (
                <Box sx={{ mt: 4 }}>
                    <Box sx={{ my: 2 }}>
                        <Divider />
                    </Box>
                    <Typography variant="h5" sx={{ my: 3 }}>
                        محصولات مشابه
                    </Typography>
                    <Grid container spacing={3}>
                        {relatedProducts.map((product) => (
                            <ProductCard key={product.id} {...product} />
                        ))}
                    </Grid>
                </Box>
            )}
        </Box>
    );
};
