'use client';

import { Alert, Box, Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Snackbar, TextareaAutosize, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Add, Remove } from '@mui/icons-material';
import categories from '@/constants/categories';
import { useRouter } from 'next/navigation';
import L, { LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';

async function getCityAndState(lat: number, lng: number) {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&accept-language=fa`);
    const data = await response.json();

    return {
        city: data.address.city || data.address.town || data.address.village,
        state: data.address.state
    };
}

export default () => {
    const [location, setLocation] = useState<{ latlng: L.LatLng; address: { city?: string; state?: string } } | null>(null);
    const [selectedCategories, setCategories] = useState<string[]>([]);
    const [imageFiles, setImageFiles] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [description, setDescription] = useState<string>('');
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [authorName, setAuthorName] = useState<string>('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [price, setPrice] = useState<string>('');
    const [name, setTitle] = useState<string>('');
    const router = useRouter();


    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files).filter(({ type }) => type.startsWith('image/')) as File[];
            const nonImageFiles = Array.from(e.target.files).filter(({ type }) => !type.startsWith('image/'));

            if (nonImageFiles.length > 0) {
                setSnackbarMessage('فقط فایل‌های تصویری مجاز هستند.');
                setSnackbarOpen(true);
                return;
            }

            if (imageFiles.length + selectedFiles.length > 10) {
                setSnackbarMessage('شما نمی‌توانید بیش از 10 تصویر آپلود کنید.');
                setSnackbarOpen(true);
                if (fileInputRef.current) fileInputRef.current.value = '';
                return;
            }

            selectedFiles.forEach((file) => {
                const reader = new FileReader();

                reader.onloadend = () => setImageFiles((prevFiles) => [...prevFiles, reader.result as string]);
                reader.readAsDataURL(file);
            });
        }

        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (imageFiles.length === 0) {
            setSnackbarMessage('باید حداقل یک عکس برای محصول خود انتخاب کنید');
            setSnackbarOpen(true);
            return;
        }

        try {
            const data = {
                name,
                price,
                description,
                categories: selectedCategories,
                images: imageFiles,
                available: true,
                rating: 5,
                city: location?.address.city,
                state: location?.address.state
            };

            const response = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.status === 200) {
                setSnackbarMessage('محصول شما با موفقیت ثبت شد');
                setSnackbarOpen(true);
                setDescription('');
                setImageFiles([]);
                setAuthorName('');
                setCategories([]);
                setPrice('');
                setTitle('');

                setTimeout(() => router.push('/'), 2000);
            }
        } catch (error) {
            console.error('Error uploading data:', error);
        }
    };

    const handleCloseSnackbar = () => setSnackbarOpen(false);
    const handleChange = (event: SelectChangeEvent<typeof selectedCategories>) => setCategories(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value);

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
                <Box sx={{ width: '50%', marginTop: '16px' }}>
                    <TextareaAutosize minRows={5} maxRows={200} cols={115} spellCheck={false} placeholder="به چه چیزی نیاز دارید؟" maxLength={2500} required value={description} onChange={({ target }) => setDescription(target.value)} />
                </Box>
                <Box sx={{ marginTop: '16px' }}>
                    <Button type="submit" variant="contained" color="primary">
                        ثبت درخواست
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
