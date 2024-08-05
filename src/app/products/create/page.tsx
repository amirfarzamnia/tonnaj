'use client';

import { Alert, Box, Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Snackbar, TextareaAutosize, TextField, Typography } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import categories from '@/constants/categories';
import { useRouter } from 'next/navigation';
import React from 'react';

export default () => {
    const [imageFiles, setImageFiles] = React.useState<{ name: string; base64: string }[]>([]);
    const [selectedCategories, setCategories] = React.useState<string[]>([]);
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);
    const [description, setDescription] = React.useState<string>('');
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [authorName, setAuthorName] = React.useState<string>('');
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [title, setTitle] = React.useState<string>('');
    const [price, setPrice] = React.useState<string>('');
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

                reader.onloadend = () => setImageFiles((prevFiles) => [...prevFiles, { name: file.name, base64: reader.result as string }]);
                reader.readAsDataURL(file);
            });
        }

        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (imageFiles.length == 0) {
            setSnackbarMessage('باید حداقل یک عکس برای محصول خود انتخاب کنید');
            setSnackbarOpen(true);

            return;
        }

        try {
            const data = { title, price, description, categories: selectedCategories, name: 'ali', phone_number: '4305303', images: imageFiles, available: true, rating: 5 };
            const response = await fetch('/api/product', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });

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
                <Grid container spacing={2}>
                    {imageFiles.map((src, index) => (
                        <Grid item xs={2} key={index}>
                            <Box sx={{ position: 'relative' }}>
                                <IconButton onClick={() => setImageFiles((prev) => prev.filter((_, i) => i !== index))} sx={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }}>
                                    <Remove />
                                </IconButton>
                                <Box component="img" loading="lazy" src={src.base64} alt={`Uploaded ${index}`} sx={{ width: '100%', height: 'auto', borderRadius: '4px' }} />
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
                        <Box component="input" type="file" id="img" sx={{ opacity: 0, position: 'absolute', zIndex: -1 }} multiple accept="image/*" onChange={handleImage} ref={fileInputRef} />
                    </Box>
                </Box>
                <Box sx={{ width: '50%', marginTop: '16px' }}>
                    <TextField type="text" label="عنوان محصول" fullWidth required value={title} onChange={({ target }) => setTitle(target.value)} />
                </Box>
                <Box sx={{ width: '50%', marginTop: '16px' }}>
                    <TextField type="number" label="قیمت محصول" fullWidth required value={price} onChange={({ target }) => setPrice(target.value)} />
                </Box>
                <Box sx={{ width: '50%', marginTop: '16px' }}>
                    <TextField type="text" label="نام شخص یا شرکت" fullWidth required value={authorName} onChange={({ target }) => setAuthorName(target.value)} />
                </Box>
                <Box sx={{ width: '50%', marginTop: '16px' }}>
                    <FormControl fullWidth>
                        <InputLabel id="categories-select-label">دسته بندی</InputLabel>
                        <Select labelId="categories-select-label" id="categories-select" multiple value={selectedCategories} onChange={handleChange} renderValue={(selected) => selected.join(', ')}>
                            {categories.map((category) => (
                                <MenuItem value={category}>{category}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ width: '50%', marginTop: '16px' }}>
                    <TextareaAutosize minRows={5} spellCheck={false} placeholder="توضیحات محصول" maxLength={2500} required value={description} onChange={({ target }) => setDescription(target.value)} />
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
