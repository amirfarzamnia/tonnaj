'use client';

import { Alert, Box, Divider, Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Snackbar, TextareaAutosize, TextField, Typography } from '@mui/material';
import { renderToStaticMarkup } from 'react-dom/server';
import { Add, Clear, Room } from '@mui/icons-material';
import categories from '@/constants/categories';
import { ProductTypes } from '@/types/product';
import { useRouter } from 'next/navigation';
import React from 'react';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

export default () => {
    const initialProductState: Omit<ProductTypes, 'timestamp' | 'rating' | 'id' | 'available' | 'author'> = { categories: [], description: '', images: [], price: 0, name: '', location: { latlng: new L.LatLng(32.4279, 53.688), state: '', city: '' } };

    const [snackbarSeverity, setSnackbarSeverity] = React.useState<'success' | 'error'>('success');
    const [product, setProduct] = React.useState(initialProductState);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const mapRef = React.useRef<HTMLDivElement | null>(null);
    const markerRef = React.useRef<L.Marker | null>(null);
    const mapInstance = React.useRef<L.Map | null>(null);
    const router = useRouter();

    React.useEffect(() => {
        if (!(mapRef.current && !mapInstance.current)) return;

        mapInstance.current = L.map(mapRef.current, { attributionControl: false }).setView(product.location.latlng, 5);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstance.current);

        const handleMapClick = async (e: L.LeafletMouseEvent) => {
            const response = await fetch('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + e.latlng.lat + '&lon=' + e.latlng.lng + '&accept-language=fa');
            const { address } = await response.json();

            const city = address.city || address.town || address.village || 'ناشناس';
            const state = address.state || city;

            setProduct((prevProduct) => ({ ...prevProduct, location: { latlng: e.latlng, state, city } }));

            if (markerRef.current) mapInstance.current!.removeLayer(markerRef.current);

            const markerOptions = { icon: L.divIcon({ html: renderToStaticMarkup(<Room sx={{ ms: 1 }} />) }) };
            const marker = L.marker(e.latlng, markerOptions).addTo(mapInstance.current!).bindPopup(`استان: ${address.state}<br>شهر یا روستا: ${city}`).openPopup();

            markerRef.current = marker;
        };

        mapInstance.current.on('click', handleMapClick);

        return () => {
            mapInstance.current?.off('click', handleMapClick);
            mapInstance.current?.remove();
            mapInstance.current = null;
        };
    }, []);

    const handleCloseSnackbar = () => setSnackbarOpen(false);
    const handleInputChange = (key: keyof typeof initialProductState, value: any) => setProduct((prevProduct) => ({ ...prevProduct, [key]: value }));

    return (
        <Box
            component="form"
            onSubmit={async (e: React.FormEvent) => {
                e.preventDefault();

                const response = await fetch('/api/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ method: 'create', product }) });
                const json = await response.json();

                setSnackbarMessage(json.message || json.error);
                setSnackbarSeverity(response.ok ? 'success' : 'error');

                if (response.ok) {
                    setProduct(initialProductState);

                    setTimeout(() => router.push('/products/' + json.id), 2500);
                }

                setSnackbarOpen(true);
            }}
            sx={{ width: '80%', mx: 'auto' }}>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
                <Grid container spacing={2} sx={{ width: '100%' }}>
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            موقعیت مکانی دقیق خود را از طریق نقشه زیر انتخاب کنید.
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            توجه داشته باشید که این موقعیت مکانی برای همه قابل مشاهده خواهد بود.
                        </Typography>
                    </Box>
                    <Grid item xs={12}>
                        <Box ref={mapRef} sx={{ height: '25rem', width: '100%', border: 1, borderColor: 'rgba(133, 133, 133, 0.5)', borderRadius: 1 }}></Box>
                    </Grid>
                    <Box sx={{ width: '98%', my: 2 }}>
                        <Divider />
                    </Box>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            {product.images.map((src, index) => (
                                <Grid item xs={2} key={index}>
                                    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                                        <IconButton
                                            onClick={() => {
                                                handleInputChange(
                                                    'images',
                                                    product.images.filter((_, i) => i !== index)
                                                );
                                            }}
                                            size="small"
                                            sx={{ position: 'absolute', top: -17.5, right: -17.5, zIndex: 1, color: 'red', background: 'rgba(0, 0, 0, 0.05)', border: 1, borderColor: 'rgba(133, 133, 133, 0.5)' }}>
                                            <Clear />
                                        </IconButton>
                                        <Box component="img" loading="lazy" src={src} alt={`Uploaded ${index}`} sx={{ width: '100%', height: '100%', borderRadius: '4px', objectFit: 'cover' }} />
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ width: '100%', height: '30vh', display: 'flex', alignItems: 'center', borderRadius: 1, justifyContent: 'center', border: 1, borderColor: 'rgba(133, 133, 133, 0.5)', padding: '16px', marginTop: '16px' }}>
                            <Box component="label" htmlFor="img" sx={{ cursor: 'pointer', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <Add fontSize="large" />
                                <Typography variant="body2" sx={{ marginTop: '10px' }}>
                                    برای اضافه کردن تصویر یا تصاویر محصول اینجا ضربه بزنید.
                                </Typography>
                                <Box
                                    component="input"
                                    type="file"
                                    id="img"
                                    sx={{ opacity: 0, position: 'absolute', zIndex: -1 }}
                                    multiple
                                    accept="image/*"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        e.preventDefault();

                                        if (!e.target.files) return;

                                        const selectedFiles = Array.from(e.target.files).filter(({ type }) => type.startsWith('image/')) as File[];
                                        const nonImageFiles = Array.from(e.target.files).filter(({ type }) => !type.startsWith('image/'));

                                        if (nonImageFiles.length > 0) {
                                            setSnackbarMessage('فقط فایل‌های تصویری مجاز هستند.');
                                            setSnackbarSeverity('error');
                                            setSnackbarOpen(true);

                                            return;
                                        }

                                        if (product.images.length + selectedFiles.length > 10) {
                                            setSnackbarMessage('شما نمی‌توانید بیش از 10 تصویر آپلود کنید.');
                                            setSnackbarSeverity('error');
                                            setSnackbarOpen(true);

                                            if (fileInputRef.current) fileInputRef.current.value = '';

                                            return;
                                        }

                                        const images = [...product.images];

                                        selectedFiles.forEach((file) => {
                                            const reader = new FileReader();

                                            reader.onloadend = () => {
                                                images.push(reader.result as string);

                                                setProduct((prevProduct) => ({ ...prevProduct, images }));
                                            };

                                            reader.readAsDataURL(file);
                                        });
                                    }}
                                    ref={fileInputRef}
                                />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField type="text" label="نام محصول" fullWidth required value={product.name} onChange={({ target }) => handleInputChange('name', target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField type="number" label="قیمت محصول (تومان)" fullWidth required value={product.price} onChange={({ target }) => handleInputChange('price', Number(target.value))} />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="categories-select-label">دسته بندی</InputLabel>
                            <Select labelId="categories-select-label" id="categories-select" multiple value={product.categories} onChange={(event: SelectChangeEvent<typeof product.categories>) => handleInputChange('categories', typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value)} renderValue={(selected) => selected.join(', ')}>
                                {categories.map((category) => (
                                    <MenuItem key={category} value={category}>
                                        {category}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextareaAutosize minRows={5} spellCheck={false} placeholder="توضیحات محصول را اینجا وارد کنید..." maxLength={2500} required value={product.description} onChange={({ target }) => handleInputChange('description', target.value)} style={{ width: '100%', maxWidth: '100%', minWidth: '100%', padding: '16px', border: '1px solid rgba(133, 133, 133, 0.75)', borderRadius: '4px', background: 'rgba(0, 0, 0, 0.05)' }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            ثبت محصول
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};
