'use client';

import { Alert, Box, Divider, Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Snackbar, TextareaAutosize, Typography } from '@mui/material';
import { renderToStaticMarkup } from 'react-dom/server';
import { ProductRequestTypes } from '@/types/product';
import categories from '@/constants/categories';
import { useRouter } from 'next/navigation';
import { Room } from '@mui/icons-material';
import React from 'react';
import L from 'leaflet';

export default () => {
    const initialProductState: Omit<ProductRequestTypes, 'timestamp' | 'rating' | 'id' | 'available' | 'author'> = { categories: [], description: '', location: { latlng: new L.LatLng(32.4279, 53.688), state: '', city: '' } };

    const [product, setProduct] = React.useState(initialProductState);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
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

                const response = await fetch('/api/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(product) });
                const json = await response.json();

                setSnackbarMessage(json.message);
                setSnackbarOpen(true);

                if (response.ok) {
                    setProduct(initialProductState);

                    setTimeout(() => router.push('/'), 2000);
                }
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
                        <TextareaAutosize minRows={5} spellCheck={false} placeholder="توضیحات محصول درخواستی خود را اینجا وارد کنید..." maxLength={2500} required value={product.description} onChange={({ target }) => handleInputChange('description', target.value)} style={{ width: '100%', maxWidth: '100%', minWidth: '100%', padding: '16px', border: '1px solid rgba(133, 133, 133, 0.75)', borderRadius: '4px', background: 'rgba(0, 0, 0, 0.05)' }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            ثبت درخواست
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="warning">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};
