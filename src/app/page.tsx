'use client';

import { Grid, Typography, Box, Card, CardContent, CardMedia, FormGroup, FormControlLabel, Checkbox, CircularProgress } from '@mui/material';
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
                const urlParams = new URLSearchParams();

                if (selectedCategories.length > 0) urlParams.set('categories', selectedCategories.join(','));

                const response = await fetch('/api/products?' + urlParams.toString());
                const data = await response.json();

                setProducts(data);
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
            <Box sx={{ marginBottom: 4 }}>
                <Typography variant="h4" gutterBottom>
                    دسته بندی ها
                </Typography>
                <FormGroup row>
                    {categories.map((category) => (
                        <FormControlLabel key={category} control={<Checkbox checked={selectedCategories.includes(category)} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSelectedCategories((prev) => (event.target.checked ? [...prev, event.target.value] : prev.filter((item) => item !== event.target.value)))} value={category} />} label={category} />
                    ))}
                </FormGroup>
            </Box>
            <Typography variant="h4" gutterBottom>
                محصولات
            </Typography>
            <Grid container spacing={3}>
                {products.map(({ price, description, images, title, id }) => (
                    <Grid item xs={12} sm={6} md={3} key={id}>
                        <Link href={'/products/' + id} passHref style={{ textDecoration: 'none' }}>
                            <Card sx={{ 'transition': 'transform 0.3s ease, box-shadow 0.3s ease', '&:hover': { transform: 'scale(1.01)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' } }}>
                                <Swiper modules={[Pagination]} spaceBetween={10} slidesPerView={1} pagination={{ clickable: true }}>
                                    {images.map((image, index) => (
                                        <SwiperSlide key={index}>
                                            <CardMedia component="img" loading="lazy" src={image} alt={`${title} (تصویر شماره ${index + 1})`} sx={{ height: '200px', objectFit: 'cover' }} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {description}
                                    </Typography>
                                    <Typography variant="h6" color="primary" gutterBottom>
                                        {price}
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
