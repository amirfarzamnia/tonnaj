import { Box, Grid, TextField, Button, Typography, Snackbar, Alert, IconButton, Divider, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { ProductTypes, ProductRequestTypes } from '@/types/product';
import units_of_measurement from '@/constants/units_of_measurement';
import { Add, Clear, Room } from '@mui/icons-material';
import categories from '@/constants/categories';
import { useRouter } from 'next/navigation';
import React from 'react';

const initialProductState: Omit<Omit<ProductTypes, 'price' | 'stock_quantity' | 'minimum'> & { price: number | null; stock_quantity: number | null; minimum: number | null }, 'timestamp' | 'id' | 'available' | 'author'> = { categories: [], description: '', images: [], price: null, unit_of_measurement: '', minimum: null, stock_quantity: null, name: '', location: { state: '', city: '' } };
const initialProductRequestState: Omit<ProductRequestTypes, 'timestamp' | 'id' | 'available' | 'author'> = { categories: [], description: '', location: { state: '', city: '' } };

const categoriesFlat = Object.values(categories).flatMap(Object.values).flat();

export default function ({ method }: { method: 'create' | 'request' }) {
    const [product, setProduct] = React.useState(method === 'create' ? initialProductState : initialProductRequestState);
    const [snackbarSeverity, setSnackbarSeverity] = React.useState<'success' | 'error'>('success');
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const mapRef = React.useRef<HTMLDivElement | null>(null);
    const router = useRouter();

    React.useEffect(() => {
        (async () => !(await fetch('/api/sessions')).ok && router.push('/auth?redirect=/products/' + method))();
    }, []);

    const handleCloseSnackbar = () => setSnackbarOpen(false);
    const handleInputChange = (key: string, value: any) => setProduct((prevProduct) => ({ ...prevProduct, [key]: value }));

    return (
        <>
            <Box sx={{ height: { xs: '80px', sm: '150px', md: '180px', lg: '300px' }, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)', border: 1, borderColor: 'grey.600', backgroundImage: 'url("/images/pages/products/' + method + '/banner.png")', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center', borderRadius: 4, mb: 10 }}></Box>
            <Box
                component="form"
                onSubmit={async (e: React.FormEvent) => {
                    e.preventDefault();

                    const response = await fetch('/api/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ method, ...(method === 'create' ? { product } : { product_request: product }) }) });
                    const json = await response.json();

                    setSnackbarMessage(json.message || json.error);
                    setSnackbarSeverity(response.ok ? 'success' : 'error');

                    if (response.ok) {
                        setProduct(method === 'request' ? initialProductRequestState : initialProductState);

                        setTimeout(() => router.push(method === 'create' ? '/products/' + json.id : '/'), 2500);
                    }

                    setSnackbarOpen(true);
                }}
                sx={{ width: { xs: '100%', sm: '80%' }, mx: 'auto' }}>
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
                    <Grid container spacing={2} sx={{ width: '100%' }}>
                        <Box>
                            <Typography variant="h6" gutterBottom>
                                موقعیت مکانی دقیق خود یا محصول خود را از طریق نقشه زیر انتخاب کنید.
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
                                                تصاویر محصول را اینجا بارگذاری کنید.
                                            </Typography>
                                            <input
                                                ref={fileInputRef}
                                                id="img"
                                                type="file"
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                                onChange={async (e) => {
                                                    const files = Array.from(e.target.files || []);
                                                    const base64Images = await Promise.all(
                                                        files.map((file) => {
                                                            return new Promise((resolve) => {
                                                                const reader = new FileReader();

                                                                reader.onloadend = () => resolve(reader.result as string);
                                                                reader.readAsDataURL(file);
                                                            });
                                                        })
                                                    );

                                                    if (base64Images.length) handleInputChange('images', [...(product as ProductTypes).images, ...base64Images]);
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
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel>واحد اندازه‌گیری محصول</InputLabel>
                                        <Select required value={(product as ProductTypes).unit_of_measurement || ''} onChange={(e) => handleInputChange('unit_of_measurement', e.target.value)} renderValue={(selected) => selected}>
                                            {units_of_measurement.map((unit, index) => (
                                                <MenuItem key={index} value={unit}>
                                                    {unit}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField required fullWidth type="number" label="موجودی محصول (بر اساس واحد اندازه گیری)" value={(product as ProductTypes).stock_quantity || ''} onChange={(e) => handleInputChange('stock_quantity', Number(e.target.value))} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField required fullWidth type="number" label="حداقل میزان فروش (بر اساس واحد اندازه گیری)" value={(product as ProductTypes).minimum || ''} onChange={(e) => handleInputChange('minimum', Number(e.target.value))} />
                                </Grid>
                            </>
                        )}
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>دسته بندی ها</InputLabel>
                                <Select required multiple value={product.categories} onChange={(e) => handleInputChange('categories', e.target.value)} renderValue={(selected) => (selected as string[]).join(', ')}>
                                    {categoriesFlat.map((category, index) => (
                                        <MenuItem key={index} value={category}>
                                            {category}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required fullWidth label="توضیحات محصول" variant="outlined" multiline rows={4} value={product.description} onChange={(e) => handleInputChange('description', e.target.value)} placeholder="توضیحات محصول را اینجا بنویسید..." />
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
        </>
    );
}
