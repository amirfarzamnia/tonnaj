'use client';

import { Alert, Box, Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Snackbar, TextareaAutosize, TextField, Typography } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import categories from '@/constants/categories';
import { ProductTypes } from '@/types/product';
import { useRouter } from 'next/navigation';
import leaflet from 'leaflet';
import React from 'react';

export default () => {
    const initialProductState: Omit<ProductTypes, 'timestamp' | 'rating' | 'id' | 'available' | 'author'> = {
        categories: [],
        description: '',
        images: [],
        price: '',
        name: '',
        location: { latlng: new leaflet.LatLng(0, 0), state: '', city: '' }
    };

    const [product, setProduct] = React.useState(initialProductState);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const mapInstance = React.useRef<leaflet.Map | null>(null);
    const mapRef = React.useRef<HTMLDivElement | null>(null);
    const router = useRouter();

    React.useEffect(() => {
        if (!(mapRef.current && !mapInstance.current)) return;

        mapInstance.current = leaflet.map(mapRef.current, { attributionControl: false }).setView([32.4279, 53.688], 5);

        leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstance.current);

        const handleMapClick = async (e: leaflet.LeafletMouseEvent) => {
            const response = await fetch('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + e.latlng.lat + '&lon=' + e.latlng.lng + '&accept-language=fa');
            const { address } = await response.json();

            const city = address.city || address.town || address.village;
            const state = address.state || city;

            setProduct((prevProduct) => ({
                ...prevProduct,
                location: { latlng: e.latlng, state, city }
            }));

            leaflet.marker(e.latlng).addTo(mapInstance.current!).bindPopup(`استان: ${address.state}<br>شهر یا روستا: ${city}`).openPopup();
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
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files).filter(({ type }) => type.startsWith('image/')) as File[];
            const nonImageFiles = Array.from(e.target.files).filter(({ type }) => !type.startsWith('image/'));

            if (nonImageFiles.length > 0) {
                setSnackbarMessage('فقط فایل‌های تصویری مجاز هستند.');
                setSnackbarOpen(true);

                return;
            }

            if (product.images.length + selectedFiles.length > 10) {
                setSnackbarMessage('شما نمی‌توانید بیش از 10 تصویر آپلود کنید.');
                setSnackbarOpen(true);

                if (fileInputRef.current) fileInputRef.current.value = '';

                return;
            }

            selectedFiles.forEach((file) => {
                const reader = new FileReader();

                reader.onloadend = () => handleInputChange('images', [...product.images, reader.result as string]);
                reader.readAsDataURL(file);
            });
        }

        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <Box
            component="form"
            onSubmit={async (e: React.FormEvent) => {
                e.preventDefault();

                if (product.images.length === 0) {
                    setSnackbarMessage('باید حداقل یک عکس برای محصول خود انتخاب کنید');
                    setSnackbarOpen(true);

                    return;
                }

                try {
                    const response = await fetch('/api/products', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(product)
                    });

                    if (response.status === 200) {
                        setSnackbarMessage('محصول شما با موفقیت ثبت شد');
                        setSnackbarOpen(true);
                        setProduct(initialProductState);

                        setTimeout(() => router.push('/'), 2000);
                    }
                } catch (error) {
                    console.error('Error uploading data:', error);
                }
            }}
            sx={{ width: '100%' }}>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
                <Box width={'100%'} ref={mapRef} sx={{ height: '500px', width: '100%' }}></Box>
                <Grid container spacing={2} mt={10}>
                    {product.images.map((src, index) => (
                        <Grid item xs={2} key={index}>
                            <Box sx={{ position: 'relative' }}>
                                <IconButton
                                    onClick={() => {
                                        handleInputChange(
                                            'images',
                                            product.images.filter((_, i) => i !== index)
                                        );
                                    }}
                                    sx={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }}>
                                    <Remove />
                                </IconButton>
                                <Box component="img" loading="lazy" src={src} alt={`Uploaded ${index}`} sx={{ width: '100%', height: 'auto', borderRadius: '4px' }} />
                            </Box>
                        </Grid>
                    ))}
                </Grid>
                <Box sx={{ width: '90%', height: '30vh', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px dashed gray', borderRadius: '4px', padding: '16px', marginTop: '16px' }}>
                    <Box component="label" htmlFor="img" sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Add fontSize="large" color="success" sx={{ fontWeight: 'bold', scale: '1.1' }} />
                        <Typography variant="h6" sx={{ marginTop: '10px' }}>
                            اضافه کردن عکس محصول
                        </Typography>
                        <Typography variant="body2" sx={{ marginTop: '10px', textAlign: 'center' }}>
                            برای معرفی محصول به خریداران لازم است عکس محصول خود را ارسال کنید. جهت تایید توسط خریدار، حتما از عکس واقعی استفاده کنید
                        </Typography>
                        <Typography variant="body2" sx={{ marginTop: '10px', textAlign: 'center' }}>
                            حتما عکس از بسته بندی و یک عکس از نزدیک داخل محصول برای جذب خریدار ثبت کنید
                        </Typography>
                        <Box component="input" type="file" id="img" sx={{ opacity: 0, position: 'absolute', zIndex: -1 }} multiple accept="image/*" onChange={handleImageChange} ref={fileInputRef} />
                    </Box>
                </Box>
                <Box sx={{ width: '50%', marginTop: '16px' }}>
                    <TextField type="text" label="عنوان محصول" fullWidth required value={product.name} onChange={({ target }) => handleInputChange('name', target.value)} />
                </Box>
                <Box sx={{ width: '50%', marginTop: '16px' }}>
                    <TextField type="number" label="قیمت محصول" fullWidth required value={product.price} onChange={({ target }) => handleInputChange('price', target.value)} />
                </Box>
                <Box sx={{ width: '50%', marginTop: '16px' }}>
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
                </Box>
                <Box sx={{ width: '50%', marginTop: '16px' }}>
                    <TextareaAutosize minRows={5} spellCheck={false} placeholder="توضیحات محصول" maxLength={2500} required value={product.description} onChange={({ target }) => handleInputChange('description', target.value)} />
                </Box>
                <Box sx={{ marginTop: '16px' }}>
                    <Button type="submit" variant="contained" color="primary">
                        ثبت آگهی
                    </Button>
                </Box>
            </Box>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="warning">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};
