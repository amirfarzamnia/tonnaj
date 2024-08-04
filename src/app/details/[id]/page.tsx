'use client';

import { Box, Button, Grid, Typography, Paper, Link, IconButton } from '@mui/material';
import { FaBarcode, FaLeaf, FaLocationArrow, FaTag } from 'react-icons/fa';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { BsWhatsapp, BsTelegram } from 'react-icons/bs';
import { Star, StarBorder } from '@mui/icons-material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useShop } from '@/context/shopContext';
import { useEffect, useState } from 'react';
import { CartTypes } from '@/types/types';
import { BiUser } from 'react-icons/bi';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css';

export default function ProductPage({ params }: { params: { id: string } }) {
    const [product, setProduct] = useState<CartTypes | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<CartTypes[]>([]);
    const [error, setError] = useState<boolean>(false);
    const { cartItems } = useShop();

    useEffect(() => {
        if (!params.id) return;

        const product = cartItems.find(({ id }) => id === Number(params.id));

        if (!product) return setError(true);

        setProduct(product);
        setRelatedProducts(cartItems.filter(({ id, category }) => category === product.category && id !== product.id));
    }, [params.id, cartItems]);

    if (error) return <Typography variant="h4">محصول مورد نظر یافت نشد</Typography>;
    if (!product) return <Typography variant="h4">در حال بارگذاری...</Typography>;

    const infoItems = [
        { icon: <FaLeaf />, label: 'نوع محصول', value: product.category },
        { icon: <FaLocationArrow />, label: 'موقعیت مکانی', value: `${product.location.city} - ${product.location.state}` },
        { icon: <FaBarcode />, label: 'حداقل سفارش', value: product.min ?? 'ندارد' },
        { icon: <FaBarcode />, label: 'حداکثر سفارش', value: product.max ?? 'ندارد' },
        { icon: <BiUser />, label: 'فروشنده', value: product.author },
        { icon: <FaTag />, label: 'کد محصول', value: product.id },
        { icon: <Star />, label: 'وضعیت', value: product.available ? 'موجود' : 'ناموجود' }
    ];

    return (
        <Box sx={{ padding: 3 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Swiper modules={[Navigation, Pagination, Scrollbar]} spaceBetween={10} slidesPerView={1} navigation pagination={{ clickable: true }} scrollbar={{ draggable: true }}>
                        {product.images.map((img, idx) => (
                            <SwiperSlide key={idx}>
                                <img src={img} alt={`Product image ${idx + 1}`} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ padding: 2, borderRadius: 2 }}>
                        <Typography variant="h4">{product.title}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>{Array.from({ length: 5 }, (_, index) => (index < product.rating ? <Star key={index} color="primary" /> : <StarBorder key={index} color="primary" />))}</Box>
                        <Typography variant="h6" color="textSecondary" paragraph>
                            {product.description}
                        </Typography>
                        <Typography variant="h5" color="textPrimary">
                            قیمت: {product.price} تومان
                        </Typography>
                        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                            تماس با فروشنده
                        </Button>
                        <Box sx={{ mt: 2 }}>
                            {infoItems.map((item, index) => (
                                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <Box sx={{ mr: 1 }}>{item.icon}</Box>
                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                        {item.label}:{' '}
                                    </Typography>
                                    <Typography variant="body1" sx={{ ml: 1 }}>
                                        {item.value}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
            <Box sx={{ mt: 4 }}>
                <Typography variant="h6">محصولات مشابه</Typography>
                <Grid container spacing={2}>
                    {relatedProducts.map((item) => (
                        <Grid item xs={12} sm={6} md={4} key={item.id}>
                            <Paper sx={{ padding: 2, borderRadius: 2, textAlign: 'center' }}>
                                <img src={item.images[0]} alt={item.title} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                                <Typography variant="h6" sx={{ mt: 1 }}>
                                    {item.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {item.description}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Link href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`برای مشاهده جزئیات ${product.title} به لینک زیر مراجعه کنید: https://example.com/product/${product.id}`)}`} target="_blank" sx={{ mr: 1 }}>
                    <IconButton color="primary">
                        <BsWhatsapp size={24} />
                    </IconButton>
                </Link>
                <Link href={`https://t.me/share/url?url=${encodeURIComponent(`https://example.com/product/${product.id}`)}&text=${encodeURIComponent(`مشاهده محصول ${product.title}`)}`} target="_blank">
                    <IconButton color="primary">
                        <BsTelegram size={24} />
                    </IconButton>
                </Link>
            </Box>
        </Box>
    );
}
