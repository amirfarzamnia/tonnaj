'use client';

import { Card, CardContent, CardMedia, Typography, Button, Box, Divider, Link } from '@mui/material';
import { ArrowBack, Person, Sell, DateRange } from '@mui/icons-material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ProductTypes } from '@/types/product';
import { Pagination } from 'swiper/modules';
import Compressor from 'compressorjs';
import React from 'react';

import 'swiper/css/pagination';
import 'swiper/css';

const base64ToBlob = (base64: string, type: string): Blob => {
    const byteCharacters = atob(base64.split(',')[1]);
    const byteArrays: Uint8Array[] = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);

        for (let i = 0; i < slice.length; i++) byteNumbers[i] = slice.charCodeAt(i);

        byteArrays.push(new Uint8Array(byteNumbers));
    }

    return new Blob(byteArrays, { type });
};

export default function ({ price, description, images, name, id, categories, location, author, timestamp }: ProductTypes) {
    const [compressedImages, setCompressedImages] = React.useState<string[]>([]);

    React.useEffect(() => {
        (async () => {
            try {
                const compressedImagePromises = images.map((base64Image) => {
                    const blob = base64ToBlob(base64Image, 'image/jpeg');

                    return new Promise<string>((resolve, reject) => {
                        new Compressor(blob, {
                            quality: 0.9,
                            maxWidth: 1920,
                            maxHeight: 1080,
                            success(result) {
                                const reader = new FileReader();

                                reader.onloadend = () => resolve(reader.result as string);
                                reader.readAsDataURL(result);
                            },
                            error(e) {
                                reject(e);
                            }
                        });
                    });
                });

                setCompressedImages(await Promise.all(compressedImagePromises));
            } catch {}
        })();
    }, [images]);

    return (
        <Card sx={{ borderRadius: 4 }}>
            <Swiper modules={[Pagination]} spaceBetween={10} slidesPerView={1} pagination={{ clickable: true }}>
                {compressedImages.map((image, index) => (
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
                <Typography variant="body1" color="textSecondary" gutterBottom sx={{ mb: 2, height: '16vh' }}>
                    {description.slice(0, 100)}...
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom sx={{ fontSize: 'small' }}>
                    <Sell sx={{ fontSize: 'smaller', ml: 1 }} />
                    به قیمت {price.toLocaleString()} تومان
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom sx={{ fontSize: 'small' }}>
                    <Person sx={{ fontSize: 'smaller', ml: 1 }} />
                    توسط {author.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom sx={{ fontSize: 'small' }}>
                    <DateRange sx={{ fontSize: 'smaller', ml: 1 }} />
                    در تاریخ {new Intl.DateTimeFormat('fa-IR', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Tehran' }).format(new Date(timestamp)).replace(/(\d{4})\/(\d{2})\/(\d{2})/, '$1/$2/$3')}
                </Typography>
                <Button endIcon={<ArrowBack />} href={'/products/' + id} variant="outlined" color="success" sx={{ 'mt': 2, 'width': '100%', 'py': 2, 'display': 'flex', 'alignItems': 'center', 'gap': 2, 'borderRadius': 1, '&:hover .MuiSvgIcon-root': { transform: 'translateX(-5px)', transition: 'transform 0.3s ease' } }}>
                    مشاهده محصول
                </Button>
                <Box sx={{ my: 2 }}>
                    <Divider />
                </Box>
                <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {categories.map((category) => (
                        <Link fontSize="smaller" href={'/products?categories=' + category}>
                            {category}
                        </Link>
                    ))}
                </Typography>
            </CardContent>
        </Card>
    );
}
