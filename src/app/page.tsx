'use client';

import { Grid, Typography, Button, Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRouter } from 'next/navigation';
import { useShop } from '@/contexts/shop';
import React from 'react';
import 'swiper/css';

export default () => {
    const { products } = useShop();
    const router = useRouter();

    return (
        <>
            <Box sx={{ marginBottom: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Product Categories
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {Array.from(new Set(products.flatMap(({ categories }) => categories))).map((category) => (
                        <Button key={category} variant="outlined" onClick={() => router.push(`/categories/${category}`)}>
                            {category}
                        </Button>
                    ))}
                </Box>
            </Box>
            <Typography variant="h4" gutterBottom>
                Products
            </Typography>
            <Grid container spacing={3}>
                {products.map(({ price, description, images, title, id }) => (
                    <Grid item xs={12} sm={6} md={4} key={id}>
                        <Box sx={{ border: '1px solid #ddd', borderRadius: 2, padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                    </Grid>
                ))}
            </Grid>
        </>
    );
};
