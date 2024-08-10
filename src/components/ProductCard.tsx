import { Card, CardContent, CardMedia, Typography, Button, Box, Divider, Link } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ProductTypes } from '@/types/product';
import { Pagination } from 'swiper/modules';
import { Phone } from '@mui/icons-material';
import React from 'react';

import 'swiper/css/pagination';
import 'swiper/css';

export default ({ price, description, images, name, id, categories, location }: ProductTypes) => (
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
            <Typography variant="body1" color="textSecondary" gutterBottom sx={{ height: '16vh' }}>
                {description.slice(0, 100)}...
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom sx={{ mt: 2, fontSize: 'small' }}>
                به قیمت {price} تومان
            </Typography>
            <Button endIcon={<Phone />} href={'/products/' + id} variant="outlined" color="success" sx={{ mt: 2, width: '100%', py: 2, display: 'flex', alignItems: 'center', gap: 2, borderRadius: 1 }}>
                مشاهده محصول
            </Button>
            <Box sx={{ my: 2 }}>
                <Divider />
            </Box>
            <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {categories.map((category) => (
                    <Link fontSize="smaller" href={'?categories=' + category}>
                        {category}
                    </Link>
                ))}
            </Typography>
        </CardContent>
    </Card>
);
