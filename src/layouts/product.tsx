'use client';

import { Box, Grid, TextField, Button, Typography, Snackbar, Alert, TextareaAutosize, IconButton, Divider, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { ProductTypes, ProductRequestTypes } from '@/types/product';
import { renderToStaticMarkup } from 'react-dom/server';
import { Add, Clear, Room } from '@mui/icons-material';
import categories from '@/constants/categories';
import { useRouter } from 'next/navigation';
import React from 'react';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

const initialProductState: Omit<Omit<ProductTypes, 'price'> & { price: string | null }, 'timestamp' | 'rating' | 'id' | 'available' | 'author'> = { categories: [], description: '', images: [], price: null, name: '', location: { latlng: new L.LatLng(32.4279, 53.688), state: '', city: '' } };
const initialProductRequestState: Omit<ProductRequestTypes, 'timestamp' | 'id' | 'available' | 'author'> = { categories: [], description: '', location: { latlng: new L.LatLng(32.4279, 53.688), state: '', city: '' } };

export default ({ method }: { method: 'create' | 'request' }) => {
    const [product, setProduct] = React.useState(method === 'create' ? initialProductState : initialProductRequestState);
    const [snackbarSeverity, setSnackbarSeverity] = React.useState<'success' | 'error'>('success');
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
    const handleInputChange = (key: string, value: any) => setProduct((prevProduct) => ({ ...prevProduct, [key]: value }));

    return (
        <Box
            component="form"
            onSubmit={async (e: React.FormEvent) => {
                e.preventDefault();

                const response = await fetch('/api/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ method, ...(method === 'create' ? { product } : { product_request: product }) }) });
                const json = await response.json();

                setSnackbarMessage(json.message || json.error);
                setSnackbarSeverity(response.ok ? 'success' : 'error');

                if (response.ok) {
                    if (method === 'create') {
                        setProduct(initialProductState);

                        setTimeout(() => router.push('/products/' + json.id), 2500);
                    }

                    if (method === 'request') setProduct(initialProductRequestState);
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
                    <Box sx={{ width: '98.5%', mt: 5 }}>
                        <Divider />
                    </Box>
                    {method === 'create' && (
                        <>
                            <Grid item xs={12}>
                                <Grid container spacing={2} sx={{ mt: 0 }}>
                                    {(product as ProductTypes).images.map((src, index) => (
                                        <Grid item xs={2} key={index}>
                                            <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                                                <IconButton
                                                    onClick={() => {
                                                        handleInputChange(
                                                            'images',
                                                            (product as ProductTypes).images.filter((_, i) => i !== index)
                                                        );
                                                    }}
                                                    size="small"
                                                    sx={{ position: 'absolute', top: -17.5, right: -17.5, zIndex: 1, color: 'red', background: 'rgba(0, 0, 0, 0.05)', border: 1, borderColor: 'rgba(133, 133, 133, 0.5)' }}>
                                                    <Clear />
                                                </IconButton>
                                                <Box component="img" loading="lazy" src={src} alt={`عکس شماره ${index}`} sx={{ width: '100%', height: '100%', borderRadius: '4px', objectFit: 'cover' }} />
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
                                            عکس‌هایتان را اینجا آپلود کنید.
                                        </Typography>
                                        <input
                                            ref={fileInputRef}
                                            id="img"
                                            type="file"
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            onChange={(e) => {
                                                const files = Array.from(e.target.files || []);

                                                if (files.length) handleInputChange('images', [...(product as ProductTypes).images, ...files.map((file) => URL.createObjectURL(file))]);
                                            }}
                                            multiple
                                        />
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField required fullWidth label="نام محصول" value={(product as ProductTypes).name} onChange={(e) => handleInputChange('name', e.target.value)} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField required fullWidth type="number" label="قیمت محصول (تومان)" value={(product as ProductTypes).price || ''} onChange={(e) => handleInputChange('price', Number(e.target.value))} />
                            </Grid>
                        </>
                    )}
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>دسته بندی</InputLabel>
                            <Select multiple value={product.categories} onChange={(e) => handleInputChange('categories', e.target.value)} renderValue={(selected) => (selected as string[]).join(', ')}>
                                {categories.map((category, index) => (
                                    <MenuItem key={index} value={category}>
                                        {category}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextareaAutosize required minRows={4} value={product.description} onChange={(e) => handleInputChange('description', e.target.value)} placeholder="توضیحات محصول را اینجا بنویسید." style={{ width: '100%', borderRadius: '4px', border: '1px solid rgba(133, 133, 133, 0.5)', background: 'rgba(0, 0, 0, 0.05)', padding: '12px' }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color={method === 'create' ? 'success' : 'secondary'}>
                            {method === 'create' ? 'ثبت محصول' : 'درخواست محصول'}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};
