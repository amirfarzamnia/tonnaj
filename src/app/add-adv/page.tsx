'use client';

import { Add, Remove } from '@mui/icons-material';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Textarea } from '@nextui-org/react';
import { ChangeEvent, useRef, useState } from 'react';
import { Add, Remove } from '@mui/icons-material';

export default () => {
    const [imageSrcs, setImageSrcs] = useState<Array<string | ArrayBuffer>>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [description, setDescription] = useState<string>('');
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [title, setTitle] = useState<string>('');
    const [price, setPrice] = useState<string>('');

    const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        if (e.target.files) {
            const imageFiles = Array.from(e.target.files).filter(({ type }) => type.startsWith('image/'));
            const nonImageFiles = Array.from(e.target.files).filter(({ type }) => !type.startsWith('image/'));

            if (nonImageFiles.length > 0) {
                setSnackbarMessage('فقط فایل‌های تصویری مجاز هستند.');
                setSnackbarOpen(true);
            }

            if (imageSrcs.length + imageFiles.length > 10) {
                setSnackbarMessage('شما نمی‌توانید بیش از 10 تصویر آپلود کنید.');
                setSnackbarOpen(true);

                if (fileInputRef.current) fileInputRef.current.value = '';

                return;
            }

            const readers = imageFiles.map((file) => {
                return new Promise<string | ArrayBuffer>((resolve) => {
                    const reader = new FileReader();

                    reader.onloadend = () => resolve(reader.result as string | ArrayBuffer);
                    reader.readAsDataURL(file);
                });
            });

            Promise.all(readers).then((results) => setImageSrcs((prevSrcs) => [...prevSrcs, ...results].slice(0, 10)));
        }

        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();

        imageSrcs.forEach((src, index) => typeof src === 'string' && formData.append('image' + index, src));

        formData.append('title', title);
        formData.append('price', price);
        formData.append('description', description);

        try {
            const response = await fetch('/api/add-adv', { method: 'POST', body: formData });
            const result = await response.json();
        } catch (error) {
            console.error('Error uploading data:', error);
        }
    };

    const handleCloseSnackbar = () => setSnackbarOpen(false);

    return (
        <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '10px' }}>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
                <Grid container spacing={2}>
                    {imageSrcs.map((src, index) => (
                        <Grid item xs={2} key={index}>
                            <Box sx={{ position: 'relative' }}>
                                <IconButton onClick={() => setImageSrcs((prev) => prev.filter((_, i) => i !== index))} sx={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }}>
                                    <Remove />
                                </IconButton>
                                <img src={src as string} alt={`Uploaded ${index}`} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                            </Box>
                        </Grid>
                    ))}
                </Grid>
                <Box sx={{ width: '90%', height: '30vh', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px dashed gray', borderRadius: '8px', padding: '16px', marginTop: '16px' }}>
                    <label htmlFor="img" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
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
                        <input type="file" id="img" style={{ display: 'none' }} multiple accept="image/*" onChange={handleImage} ref={fileInputRef} required />
                    </label>
                </Box>
                <Box sx={{ width: '50%', marginTop: '16px' }}>
                    <TextField label="عنوان محصول" fullWidth required value={title} onChange={(e) => setTitle(e.target.value)} />
                </Box>
                <Box sx={{ width: '50%', marginTop: '16px' }}>
                    <TextField label="قیمت محصول" fullWidth required value={price} onChange={(e) => setPrice(e.target.value)} />
                </Box>
                <Box sx={{ width: '50%', marginTop: '16px' }}>
                    <TextareaAutosize minRows={5} placeholder="توضیحات محصول" style={{ width: '100%', borderRadius: '4px', border: '1px solid #ccc', padding: '8px' }} maxLength={2500} dir="rtl" required value={description} onChange={(e) => setDescription(e.target.value)} />
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
        </form>
    );
};
