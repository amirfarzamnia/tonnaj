import { Card, CardContent, CardMedia, Typography, Button, Box, Divider, Grid } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ProductTypes } from '@/types/product';
import { Pagination } from 'swiper/modules';
import { Phone } from '@mui/icons-material';
import Link from 'next/link';
import React from 'react';

import 'swiper/css/pagination';
import 'swiper/css';

export default ({ price, description, images, name, id, author, categories, location }: ProductTypes) => {
    return (
        <Grid item xs={12} sm={6} md={3} key={id}>
            <Link href={'/products/' + id} passHref style={{ textDecoration: 'none' }}>
                <Card sx={{ borderRadius: 4 }}>
                    <Swiper modules={[Pagination]} spaceBetween={10} slidesPerView={1} pagination={{ clickable: true }}>
                        {images.map((image, index) => (
                            <SwiperSlide key={index}>
                                <CardMedia component="img" loading="lazy" src={image} alt={`${name} (تصویر شماره ${index + 1})`} sx={{ height: '200px', objectFit: 'cover' }} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <CardContent>
                        <Typography variant="h6" gutterBottom textAlign="center">
                            {name} در {location.city}
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
    );
};