'use client';

import { Grid, Typography, Box, CircularProgress, Button, CardContent, Card, Divider, Link } from '@mui/material';
import { ShoppingBasket, Close, Inventory, Phone } from '@mui/icons-material';
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
            setLoading(true);

            try {
                const urlParams = new URLSearchParams();

                if (selectedCategories.length > 0) urlParams.set('categories', selectedCategories.join(','));

                const productsResponse = await fetch('/api/products?' + urlParams.toString());
                const productsData = await productsResponse.json();

                setProducts(productsData.sort((a: ProductTypes, b: ProductTypes) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));

                const requestsResponse = await fetch('/api/products?type=request&' + urlParams.toString());
                const requestsData = await requestsResponse.json();

                setProductRequests(requestsData.sort((a: ProductRequestTypes, b: ProductRequestTypes) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
            } catch {
                setError('دریافت اطلاعات از دیتابیس با خطا مواجه شد.');
            } finally {
                setLoading(false);
            }
        })();
    }, [selectedCategories]);

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
            <Box sx={{ height: '300px', backgroundImage: 'url("/images/pages/home/banner-top.png")', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center', paddingRight: 4, borderRadius: 4 }}>
                <Box sx={{ mt: 10, mr: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Button size="large" endIcon={<Inventory />} href="/products/create" variant="contained" color="success" sx={{ display: 'flex', alignItems: 'center', gap: 1.25, width: 'fit-content' }}>
                        ثبت محصول
                    </Button>
                    <Button size="large" endIcon={<ShoppingBasket />} href="products/request" variant="contained" color="secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1.25, width: 'fit-content' }}>
                        درخواست محصول
                    </Button>
                </Box>
            </Box>
            <Box sx={{ marginBottom: 4, marginTop: 4 }}>
                <Typography variant="h5" sx={{ mb: 4 }}>
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
                                    setSelectedCategories((prev) => {
                                        const updatedCategories = prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category];
                                        const urlParams = new URLSearchParams();

                                        if (updatedCategories.length > 0) {
                                            urlParams.set('categories', updatedCategories.join(','));
                                        } else {
                                            urlParams.delete('categories');
                                        }

                                        history.pushState(null, '', location.pathname + '?' + urlParams.toString());

                                        return updatedCategories;
                                    });
                                }}
                                endIcon={selectedCategories.includes(category) && <Close />}>
                                {category}
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Typography variant="h5" sx={{ mb: 4 }}>
                جدیدترین محصولات
            </Typography>
            <Grid container spacing={3}>
                {products.length ? (
                    products.map((product) => <ProductCard key={product.id} {...product} />)
                ) : (
                    <Typography variant="body2" color="black">
                        محصولی در این دسته بندی موجود نیست.
                    </Typography>
                )}
            </Grid>
            <Box sx={{ my: 4, px: 10, height: '230px', borderRadius: 4, background: '#feb204', display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%', justifyContent: 'center' }}>
                    <Typography variant="h6" color="black" fontWeight="bold">
                        همین حالا محصولات خود را به صورت رایگان در تناژ ثبت کنید!
                    </Typography>
                    <Box>
                        <Button size="large" endIcon={<Inventory />} href="/products/create" variant="contained" color="success" sx={{ display: 'flex', alignItems: 'center', gap: 1.25, py: 0.82, width: 'fit-content' }}>
                            ثبت محصول
                        </Button>
                    </Box>
                </Box>
                <Box component={'img'} src="/images/pages/home/banner-middle.png" sx={{ objectFit: 'cover', height: '230px', pb: 1 }} />
            </Box>
            <Typography variant="h5" sx={{ my: 4 }}>
                جدیدترین درخواست های خرید محصول
            </Typography>
            {productRequests.length ? (
                <Swiper modules={[Pagination, Scrollbar]} slidesPerView={4} spaceBetween={10} pagination={{ clickable: true }} scrollbar={{ draggable: true }}>
                    {productRequests.map(({ id, author, description, location }) => (
                        <SwiperSlide key={id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '90%', height: 'auto' }}>
                            <Card sx={{ width: 345, height: '100%', borderRadius: 4, display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant="h6" gutterBottom textAlign="center" fontSize="medium">
                                        {author.name} از {location.city}
                                    </Typography>
                                    <Box sx={{ my: 2 }}>
                                        <Divider />
                                    </Box>
                                    <Typography variant="body1" color="textSecondary" gutterBottom sx={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3 }}>
                                        {description.slice(0, 100)}
                                    </Typography>
                                    <Button endIcon={<Phone />} href={'tel:' + author.phone_number} variant="outlined" color="secondary" sx={{ mt: 2, width: '100%', py: 2, display: 'flex', alignItems: 'center', gap: 2, borderRadius: 1 }} onClick={(event) => event.stopPropagation()}>
                                        تماس با خریدار
                                    </Button>
                                    <Box sx={{ my: 2 }}>
                                        <Divider />
                                    </Box>
                                    <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        {categories.map((category) => (
                                            <Link key={category} fontSize="smaller" href={'?categories=' + category}>
                                                {category}
                                            </Link>
                                        ))}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <Typography variant="body2" color="black">
                    محصول مورد نیازی در این دسته بندی موجود نیست.
                </Typography>
            )}
            <Box sx={{ my: 4, px: 10, height: '230px', borderRadius: 4, background: '#feb204', display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%', justifyContent: 'center' }}>
                    <Typography variant="h6" color="black" fontWeight="bold">
                        محصول مورد نیاز خود را همین حالا در تناژ درخواست کنید!
                    </Typography>
                    <Box>
                        <Button size="large" endIcon={<ShoppingBasket />} href="/products/request" variant="contained" color="secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1.25, py: 0.82, width: 'fit-content' }}>
                            درخواست محصول
                        </Button>
                    </Box>
                </Box>
                <Box component={'img'} src="/images/pages/home/banner-bottom.png" sx={{ objectFit: 'cover', height: '230px' }} />
            </Box>
        </>
    );
};
