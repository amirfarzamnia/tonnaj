'use client';

import { Grid, Typography, Box, CircularProgress, Button, Divider, CardActionArea, CardContent, Card } from '@mui/material';
import { Sell, ShoppingBasket, Close, ArrowLeft } from '@mui/icons-material';
import ProductCard from '@/components/ProductCard';
import categories from '@/constants/categories';
import { ProductTypes } from '@/types/product';
import React from 'react';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default () => {
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
                    تناژ، بزرگترین پلتفرم خرید و فروش محصولات عمده در کشور
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

            <Box sx={{ mt: 10, width: '90%', height: "230px", ml: "auto", mr: "auto", borderRadius: 2, backgroundColor: 'wheat', display: 'flex' }}>
                <Box sx={{ width: '75%' }}>
                    <Box sx={{ padding: 2 }}>
                        <Typography variant='h4'>
                            همین حالا محصول خود را در تناژ ثبت کنید
                        </Typography>
                    </Box>
                    <Box>
                        <Button size='large' variant='contained' sx={{ backgroundColor: "orange", borderRadius: 4, mr: 2 }} href='/products/create'>
                            ثبت محصول  <ArrowLeft />
                        </Button>
                    </Box>
                </Box>

                <Box sx={{ width: "25%", display: 'flex', justifyContent: 'end', backgroundColor: "rgb(170, 149, 110)", borderRadius: 2 }}>
                    <Box component={'img'} src='/landing-banner-avatar.png' sx={{ objectFit: 'cover', height: "230px" }} />
                </Box>
            </Box>

            <Box sx={{ width: "100%", display: 'flex', justifyContent: 'center' }}>
                <Swiper
                    style={{ width: "90%", height: "300px", padding: 12 }}
                    // install Swiper modules
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={50}
                    slidesPerView={3}
                    navigation
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}
                >

                    <SwiperSlide style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '90%' }}>
                        <Card sx={{ width: 345 }} dir='rtl'>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    علی
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    1 کلیو سیب زمینی
                                </Typography>
                            </CardContent>
                            <Box mt={1} mb={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Button href='tel:11111'>
                                    تماس
                                </Button>
                            </Box>
                        </Card>
                    </SwiperSlide>

                    <SwiperSlide style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '90%' }}>
                        <Card sx={{ width: 345 }} dir='rtl'>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    علی
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    1 کلیو سیب زمینی
                                </Typography>
                            </CardContent>
                            <Box mt={1} mb={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Button href='tel:11111'>
                                    تماس
                                </Button>
                            </Box>
                        </Card>
                    </SwiperSlide>

                    <SwiperSlide style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '90%' }}>
                        <Card sx={{ width: 345 }} dir='rtl'>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    علی
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    1 کلیو سیب زمینی
                                </Typography>
                            </CardContent>
                            <Box mt={1} mb={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Button href='tel:11111'>
                                    تماس
                                </Button>
                            </Box>
                        </Card>
                    </SwiperSlide>

                    <SwiperSlide style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '90%' }}>
                        <Card sx={{ width: 345 }} dir='rtl'>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    علی
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    1 کلیو سیب زمینی
                                </Typography>
                            </CardContent>
                            <Box mt={1} mb={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Button href='tel:11111'>
                                    تماس
                                </Button>
                            </Box>
                        </Card>
                    </SwiperSlide>


                </Swiper>
            </Box>


            <Divider sx={{ mt: 8, mb: 5 }} />
            <Box sx={{ height: '70vh', width: "100%", backgroundColor: 'rgb(255 255 255 / .2)', borderRadius: 7, display: 'flex', justifyContent: "space-between", alignItems: 'center' }}>
                <Box sx={{ width: "30%", height: "60vh" }}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant='h4' sx={{ color: "white" }}>
                            در صورتی که خریدار عمده هستید ،
                        </Typography>
                        <Typography sx={{ color: 'black', mt: 1 }}>
                            با ثبت یک درخواست خرید، از چندین فروشنده قیمت دریافت کنید
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ width: "60%", ml: "auto", mr: "auto", height: "50vh", backgroundColor: 'white', borderRadius: 4 }}>
                    <Box sx={{ textAlign: 'center' }}>

                        <Typography sx={{ color: 'black', mt: 1 }}>
                            با ثبت یک درخواست خرید، از چندین فروشنده قیمت دریافت کنید
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    );
};
