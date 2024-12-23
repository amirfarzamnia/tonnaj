'use client';

import { Typography, Box, CircularProgress, Button, Grid } from '@mui/material';
import { ShoppingBasket, Inventory, ArrowBack } from '@mui/icons-material';
import { ProductTypes, ProductRequestTypes } from '@/types/product';
import ProductRequestCard from '@/components/product-request-card';
import { Pagination, Scrollbar } from 'swiper/modules';
import ProductCard from '@/components/product-card';
import { Swiper, SwiperSlide } from 'swiper/react';
import React from 'react';

import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css';

export default function () {
    const [productRequests, setProductRequests] = React.useState<ProductRequestTypes[]>([]);
    const [products, setProducts] = React.useState<ProductTypes[]>([]);
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        (async () => {
            setLoading(true);

            try {
                const productsResponse = await fetch('/api/products?type=product&filters=newest');
                const productsData = await productsResponse.json();

                setProducts(productsData);

                const requestsResponse = await fetch('/api/products?type=request&filters=newest');
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
            <Box sx={{ height: { xs: '80px', sm: '150px', md: '180px', lg: '300px' }, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)', border: 1, borderColor: 'grey.600', backgroundImage: 'url("/images/pages/home/banner-top.png")', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center', paddingRight: 4, borderRadius: 4 }}>
                <Box sx={{ mt: { xs: 5, lg: 10 }, mr: { xs: 0, lg: 4 }, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Button size="large" endIcon={<Inventory />} href="/products/create" variant="contained" color="success" sx={{ 'display': 'flex', 'alignItems': 'center', 'gap': 1.25, 'width': 'fit-content', '@media (max-width:600px)': { padding: '4px 8px', fontSize: '0.4rem' } }}>
                        ثبت محصول
                    </Button>
                    <Button size="large" endIcon={<ShoppingBasket />} href="products/request" variant="contained" color="secondary" sx={{ 'display': 'flex', 'alignItems': 'center', 'gap': 1.25, 'width': 'fit-content', '@media (max-width:600px)': { padding: '4px 8px', fontSize: '0.4rem' } }}>
                        درخواست محصول
                    </Button>
                </Box>
            </Box>
            <Grid container spacing={2} my={8}>
                {['صنایع غذایی', 'صنایع نساجی', 'صنایع الکترونیک', 'صنایع ساختمانی', 'صنعت', 'صنایع کشاورزی'].map((category) => (
                    <Grid item xs={6} sm={2} key={category}>
                        <Box component="a" href={'/products?categories=' + category} sx={{ display: 'block', textAlign: 'center', textDecoration: 'none', color: 'inherit' }}>
                            <Box component="img" loading="lazy" src={'/images/pages/home/categories/' + category + '.png'} sx={{ width: '100%', height: 'auto' }} />
                            <Typography variant="h6" sx={{ mt: 1 }}>
                                {category}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
            <Typography variant="h6" sx={{ my: 4, display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, alignItems: 'center', gap: 2, justifyContent: 'space-between' }}>
                جدیدترین محصولات
                <Box component="hr" sx={{ display: { xs: 'none', lg: 'block' }, border: 0, borderTop: 1, borderColor: 'grey.600', width: '65%' }}></Box>
                <Button endIcon={<ArrowBack />} href="/products" variant="contained" color="success" sx={{ 'borderRadius': 3, 'display': 'flex', 'alignItems': 'center', 'gap': 2, '&:hover .MuiSvgIcon-root': { transform: 'translateX(-5px)', transition: 'transform 0.3s ease' } }}>
                    مشاهده همه محصولات
                </Button>
            </Typography>
            <Swiper modules={[Pagination, Scrollbar]} spaceBetween={10} pagination={{ clickable: true }} scrollbar={{ draggable: true }} breakpoints={{ 640: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 }, 1280: { slidesPerView: 4 } }}>
                {products.map((product) => (
                    <SwiperSlide key={product.id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '90%', height: 'auto' }}>
                        <ProductCard {...product} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <Box sx={{ '@media (max-width:600px)': { padding: '4px 8px' }, 'textAlign': { xs: 'center', lg: 'start' }, 'border': 1, 'borderColor': 'grey.600', 'boxShadow': '0px 4px 12px rgba(0, 0, 0, 0.3)', 'my': 4, 'px': 10, 'height': '230px', 'borderRadius': 4, 'background': '#feb204', 'display': 'flex', 'justifyContent': 'space-between', 'gap': 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%', justifyContent: 'center' }}>
                    <Typography variant="h6" color="black" fontWeight="bold">
                        همین حالا محصولات خود را به صورت رایگان در تناژ ثبت کنید!
                    </Typography>
                    <Button size="large" endIcon={<ShoppingBasket />} href="/products/create" variant="contained" color="success" sx={{ '@media (max-width:600px)': { mx: 'auto' }, 'display': 'flex', 'alignItems': 'center', 'gap': 1.25, 'py': 0.82, 'width': 'fit-content' }}>
                        ثبت محصول
                    </Button>
                </Box>
                <Box component="img" src="/images/pages/home/banner-middle.png" loading="lazy" sx={{ display: { xs: 'none', md: 'block' }, objectFit: 'cover', height: '230px', pb: 0.25 }} />
            </Box>
            <Typography variant="h6" sx={{ my: 4, display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, alignItems: 'center', gap: 2, justifyContent: 'space-between' }}>
                جدیدترین درخواست های خرید محصول
                <Box component="hr" sx={{ display: { xs: 'none', lg: 'block' }, border: 0, borderTop: 1, borderColor: 'grey.600', width: '45%' }}></Box>
                <Button endIcon={<ArrowBack />} href="/products/requests" variant="contained" color="secondary" sx={{ 'borderRadius': 3, 'display': 'flex', 'alignItems': 'center', 'gap': 2, '&:hover .MuiSvgIcon-root': { transform: 'translateX(-5px)', transition: 'transform 0.3s ease' } }}>
                    مشاهده همه درخواست های خرید
                </Button>
            </Typography>
            <Swiper modules={[Pagination, Scrollbar]} spaceBetween={10} pagination={{ clickable: true }} scrollbar={{ draggable: true }} breakpoints={{ 640: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 }, 1280: { slidesPerView: 4 } }}>
                {productRequests.map((product_request) => (
                    <SwiperSlide key={product_request.id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '90%', height: 'auto' }}>
                        <ProductRequestCard {...product_request} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <Box sx={{ '@media (max-width:600px)': { padding: '4px 8px' }, 'textAlign': { xs: 'center', lg: 'start' }, 'border': 1, 'borderColor': 'grey.600', 'boxShadow': '0px 4px 12px rgba(0, 0, 0, 0.3)', 'my': 4, 'px': 10, 'height': '230px', 'borderRadius': 4, 'background': '#feb204', 'display': 'flex', 'justifyContent': 'space-between', 'gap': 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%', justifyContent: 'center' }}>
                    <Typography variant="h6" color="black" fontWeight="bold">
                        محصول مورد نیاز خود را همین حالا در تناژ درخواست کنید!
                    </Typography>
                    <Button size="large" endIcon={<ShoppingBasket />} href="/products/request" variant="contained" color="secondary" sx={{ '@media (max-width:600px)': { mx: 'auto' }, 'display': 'flex', 'alignItems': 'center', 'gap': 1.25, 'py': 0.82, 'width': 'fit-content' }}>
                        درخواست محصول
                    </Button>
                </Box>
                <Box component="img" loading="lazy" src="/images/pages/home/banner-bottom.png" sx={{ display: { xs: 'none', md: 'block' }, objectFit: 'cover', height: '230px', pb: 0.25 }} />
            </Box>
        </>
    );
}
