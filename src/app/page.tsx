'use client';

import { Grid, Typography, Box, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useShop } from '@/contexts/shop';
import Link from 'next/link';
import React from 'react';
import 'swiper/css';

export default () => {
    const { products } = useShop();
    const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);

    React.useEffect(() => {
        const categories = new URLSearchParams(window.location.search).get('categories');

        if (categories) setSelectedCategories(categories.split(','));
    }, []);

    React.useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);

        if (selectedCategories.length > 0) {
            urlParams.set('categories', selectedCategories.join(','));
        } else {
            urlParams.delete('categories');
        }

        window.history.replaceState({}, '', window.location.pathname + '?' + urlParams.toString());
    }, [selectedCategories]);

    const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => setSelectedCategories((prev) => (event.target.checked ? [...prev, event.target.value] : prev.filter((category) => category !== event.target.value)));

    const queryCategories = new URLSearchParams(window.location.search).get('categories')?.split(',');
    const filteredProducts = queryCategories ? products.filter((product) => product.categories.some((category) => queryCategories.includes(category))) : products;

    return (
        <>
            <Box sx={{ marginBottom: 4 }}>
                <Typography variant="h4" gutterBottom>
                    دسته بندی ها
                </Typography>
                <FormGroup row>
                    {Array.from(new Set(products.flatMap(({ categories }) => categories))).map((category) => (
                        <FormControlLabel key={category} control={<Checkbox checked={selectedCategories.includes(category)} onChange={handleCategoryChange} value={category} />} label={category} />
                    ))}
                </FormGroup>
            </Box>
            <Typography variant="h4" gutterBottom>
                محصولات
            </Typography>
            <Grid container spacing={3}>
                {filteredProducts.map(({ price, description, images, title, id }) => (
                    <Grid item xs={12} sm={6} md={4} key={id}>
                        <Link href={`/products/${id}`} passHref>
                            <Box sx={{ 'border': '1px solid #ddd', 'borderRadius': 2, 'padding': 2, 'display': 'flex', 'flexDirection': 'column', 'alignItems': 'center', 'textDecoration': 'none', 'color': 'inherit', 'transition': 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'scale(1.05)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' } }}>
                                <Swiper spaceBetween={10} slidesPerView={1} pagination={{ clickable: true }} style={{ width: '100%', height: 'auto' }}>
                                    {images.map((image, index) => (
                                        <SwiperSlide key={index}>
                                            <Box sx={{ position: 'relative', width: '100%', paddingTop: '75%' }}>
                                                <img src={image} alt={`${title} image ${index + 1}`} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: 4 }} />
                                            </Box>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                <Typography variant="h6" gutterBottom>
                                    {title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {description}
                                </Typography>
                                <Typography variant="h6" color="primary" gutterBottom>
                                    {price}
                                </Typography>
                            </Box>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};
