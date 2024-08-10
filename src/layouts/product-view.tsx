'use client';

import { Box, Button, Grid, Typography, Card, Link, IconButton, CircularProgress, Divider, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Person, Category, Telegram, WhatsApp, LocationOn, Tag, Phone, Room, Delete } from '@mui/icons-material';
import { ProductTypes, ProductRequestTypes } from '@/types/product';
import { renderToStaticMarkup } from 'react-dom/server';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useRouter } from 'next/navigation';
import React from 'react';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';
import 'swiper/css/pagination';
import 'swiper/css';

type ProductOrRequest<T extends 'product' | 'request'> = T extends 'product' ? ProductTypes : ProductRequestTypes;

export default ({ type, id }: { type: 'product' | 'request'; id: string }) => {
    const [product, setProduct] = React.useState<ProductOrRequest<typeof type> | null>(null);
    const [deleteStatus, setDeleteStatus] = React.useState<string | null>(null);
    const [isOwnProduct, setIsOwnProduct] = React.useState<boolean>(false);
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const mapContainerRef = React.useRef<HTMLDivElement | null>(null);
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);
    const router = useRouter();

    const handleOpenDeleteModal = () => setOpenDeleteModal(true);
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);

    React.useEffect(() => {
        if (!id) return;

        (async () => {
            setLoading(true);

            try {
                const productResponse = await fetch(`/api/products?type=${type}&id=${id}`);

                if (!productResponse.ok) throw new Error('یافت نشد.');

                const productData = (await productResponse.json())[0] as ProductOrRequest<typeof type>;

                setProduct(productData);

                try {
                    const sessionResponse = await fetch('/api/sessions');
                    const sessionData = await sessionResponse.json();

                    setIsOwnProduct(Boolean(sessionData?.phone_number));
                } catch {}

                if (mapContainerRef.current && 'location' in productData) {
                    const latlng = Object.values(productData.location.latlng) as L.LatLngExpression;
                    const map = L.map(mapContainerRef.current, { attributionControl: false }).setView(latlng, 13);

                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
                    L.marker(latlng, { icon: L.divIcon({ html: renderToStaticMarkup(<Room sx={{ ms: 1 }} />) }) }).addTo(map);
                }
            } catch (e) {
                setError(e instanceof Error ? e.message : 'دریافت اطلاعات از دیتابیس با خطا مواجه شد.');
            } finally {
                setLoading(false);
            }
        })();
    }, [id, type]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!product) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant="h4">یافت نشد.</Typography>
                <Button href="/" color="primary" variant="outlined">
                    بازگشت به صفحه اصلی
                </Button>
            </Box>
        );
    }

    if (error) return <Typography variant="h4">{error}</Typography>;

    const shareURL = location.origin + '/products' + (type === 'product' ? '/' : '/requests/') + product.id;

    return (
        <Box sx={{ padding: 3 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    {type === 'product' && (
                        <Swiper modules={[Pagination]} spaceBetween={10} slidesPerView={1} pagination={{ clickable: true }}>
                            {product.images.map((image, idx) => (
                                <SwiperSlide key={idx}>
                                    <Box component="img" src={image} loading="lazy" alt={`تصویر شماره ${idx + 1}`} sx={{ width: '100%', height: '20rem', objectFit: 'cover', borderRadius: 4 }} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                    <Typography variant="h6" color="textSecondary" paragraph>
                        <Card sx={{ padding: 2, borderRadius: 4 }}>{product.description}</Card>
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card sx={{ padding: 2, borderRadius: 4 }}>
                        {type === 'product' && (
                            <>
                                <Typography variant="h4">{product.name}</Typography>
                                <Typography sx={{ my: 2 }} variant="h6" color="textPrimary">
                                    قیمت: {product.price} تومان
                                </Typography>
                            </>
                        )}
                        <Button endIcon={<Phone />} href={'tel:' + product.author.phone_number} variant="outlined" color={type === 'product' ? 'success' : 'secondary'} sx={{ mt: 2, width: '100%', py: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                            تماس با فروشنده
                        </Button>
                        {isOwnProduct && (
                            <Button endIcon={<Delete />} onClick={handleOpenDeleteModal} variant="contained" color="error" sx={{ mt: 2, width: '100%', py: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                {type === 'product' ? 'حذف محصول' : 'حذف درخواست'}
                            </Button>
                        )}
                        {deleteStatus && (
                            <Typography variant="h6" color={deleteStatus.includes('با موفقیت') ? 'success' : 'error'} sx={{ mt: 2 }}>
                                {deleteStatus}
                            </Typography>
                        )}
                        <Box sx={{ my: 2 }}>
                            <Divider />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            {[
                                { icon: <Category />, label: 'دسته بندی ها', value: product.categories.join(', ') },
                                { icon: <LocationOn />, label: 'موقعیت مکانی', value: `${product.location.state} - ${product.location.city}` },
                                { icon: <Person />, label: type === 'product' ? 'فروشنده' : 'خریدار', value: product.author.name },
                                { icon: <Tag />, label: type === 'product' ? 'کد محصول' : 'کد درخواست', value: product.id }
                            ].map(({ icon, label, value }, index) => (
                                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1, background: 'rgba(0, 0, 0, 0.05)', p: 1, borderRadius: 1 }}>
                                    <Box sx={{ ml: 1 }}>{icon}</Box>
                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                        {label}: {value}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                        <Box sx={{ my: 2 }}>
                            <Divider />
                        </Box>
                        <Box sx={{ height: '20rem', marginTop: 2, borderRadius: 1, overflow: 'hidden' }} ref={mapContainerRef}></Box>
                        <Box sx={{ my: 2 }}>
                            <Divider />
                        </Box>
                        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'space-between' }}>
                            <Typography variant="h6" color="textPrimary" sx={{ textWrap: 'nowrap' }}>
                                اشتراک گذاری
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Link href={`https://api.whatsapp.com/send?text=${encodeURIComponent(product.description + '\n\nمشاهده در تناژ:\n\n' + shareURL)}`} target="_blank" sx={{ mr: 1 }}>
                                    <IconButton color={type === 'product' ? 'success' : 'secondary'}>
                                        <WhatsApp />
                                    </IconButton>
                                </Link>
                                <Link href={`https://t.me/share/url?url=${shareURL}&text=${encodeURIComponent(product.description)}`} target="_blank">
                                    <IconButton color={type === 'product' ? 'success' : 'secondary'}>
                                        <Telegram />
                                    </IconButton>
                                </Link>
                            </Box>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
            <Dialog open={openDeleteModal} onClose={handleCloseDeleteModal} aria-labelledby="delete-confirmation-dialog">
                <DialogTitle id="delete-confirmation-dialog">تأیید حذف</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">آیا مطمئن هستید که می‌خواهید این {type === 'product' ? 'محصول' : 'درخواست'} را حذف کنید؟</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteModal} color="primary" variant="contained">
                        انصراف
                    </Button>
                    <Button
                        onClick={async () => {
                            if (!product?.id) return;

                            try {
                                const response = await fetch(`/api/products?type=${type}&id=${product.id}`, { method: 'DELETE' });

                                if (!response.ok) throw new Error('خطا در حذف');

                                const result = await response.json();

                                setDeleteStatus(result.message);
                                setProduct(null);
                            } catch (e) {
                                setDeleteStatus(e instanceof Error ? e.message : 'حذف با خطا مواجه شد.');
                            } finally {
                                handleCloseDeleteModal();

                                router.push('/');
                            }
                        }}
                        color="error">
                        حذف
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
