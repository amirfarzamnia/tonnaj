import { Box, Grid, TextField, Button, Typography, Snackbar, Alert, IconButton, FormControl, InputLabel, Select, MenuItem, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, Checkbox } from '@mui/material';
import { Add, Clear, Category as CategoryIcon } from '@mui/icons-material';
import { ProductTypes, ProductRequestTypes } from '@/types/product';
import units_of_measurement from '@/constants/units_of_measurement';
import proviences_cities from '@/constants/proviences_cities';
import categories from '@/constants/categories';
import { useRouter } from 'next/navigation';
import Compressor from 'compressorjs';
import React from 'react';

const filterCategories = (searchTerm: string, categories: { [key: string]: { [key: string]: string[] } }) => {
    if (!searchTerm) return categories;

    const results: { [key: string]: { [key: string]: string[] } } = {};

    Object.keys(categories).forEach((category) => {
        const subcategories = categories[category];
        const filteredSubcategories = Object.keys(subcategories).reduce((acc, subcategory) => (subcategories[subcategory].filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase())).length > 0 && (acc[subcategory] = subcategories[subcategory].filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase()))), acc), {} as { [key: string]: string[] });

        if (Object.keys(filteredSubcategories).length > 0) results[category] = filteredSubcategories;
    });

    return results;
};

const initialProductState: Omit<Omit<ProductTypes, 'price' | 'stock_quantity' | 'minimum'> & { price: number | null; stock_quantity: number | null; minimum: number | null }, 'timestamp' | 'id' | 'available' | 'author'> = { categories: [], description: '', images: [], price: null, unit_of_measurement: '', minimum: null, stock_quantity: null, name: '', location: { province: '', city: '' } };
const initialProductRequestState: Omit<ProductRequestTypes, 'timestamp' | 'id' | 'available' | 'author'> = { categories: [], description: '', location: { province: '', city: '' } };

export default function ProductForm({ method }: { method: 'create' | 'request' }) {
    const [product, setProduct] = React.useState(method === 'create' ? initialProductState : initialProductRequestState);
    const [filteredCategories, setFilteredCategories] = React.useState(() => filterCategories('', categories));
    const [snackbarSeverity, setSnackbarSeverity] = React.useState<'success' | 'error'>('success');
    const [selectedMainCategory, setSelectedMainCategory] = React.useState<string | null>(null);
    const [selectedSubCategory, setSelectedSubCategory] = React.useState<string | null>(null);
    const [currentStep, setCurrentStep] = React.useState<'main' | 'sub' | 'final'>('main');
    const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);
    const [selectedProvince, setSelectedProvince] = React.useState<string>('');
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [searchTerm, setSearchTerm] = React.useState<string>('');
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [isCustomOpen, setIsCustomOpen] = React.useState(false);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [name, setName] = React.useState<string>('');

    const fileInputRef = React.useRef<HTMLInputElement | null>(null);
    const router = useRouter();

    React.useEffect(() => {
        (async () => {
            const response = await fetch('/api/sessions');

            if (!response.ok) router.push('/auth?redirect=/products/' + method);
        })();
    }, [method, router]);

    const handleCloseSnackbar = () => setSnackbarOpen(false);
    const handleInputChange = (key: string, value: any) => setProduct((prevProduct) => ({ ...prevProduct, [key]: value }));

    return (
        <>
            <Box sx={{ height: { xs: '80px', sm: '150px', md: '180px', lg: '300px' }, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)', border: 1, borderColor: 'grey.600', backgroundImage: `url("/images/pages/products/${method}/banner.png")`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center', borderRadius: 4, mb: 10 }}></Box>
            <Box
                component="form"
                onSubmit={async (e: React.FormEvent) => {
                    e.preventDefault();

                    setLoading(true);

                    const response = await fetch('/api/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ method, ...(method === 'create' ? { product } : { product_request: product }) }) });
                    const json = await response.json();

                    setSnackbarMessage(json.message || json.error);
                    setSnackbarSeverity(response.ok ? 'success' : 'error');

                    if (response.ok) {
                        setProduct(method === 'request' ? initialProductRequestState : initialProductState);

                        setTimeout(() => router.push('/'), 2500);
                    }

                    setSnackbarOpen(true);
                    setLoading(false);
                }}
                sx={{ width: { xs: '100%', sm: '80%' }, mx: 'auto' }}>
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
                    <Grid container spacing={2} sx={{ width: '100%' }}>
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
                                            <Typography variant="h6" color="text.secondary">
                                                اضافه کردن عکس
                                            </Typography>
                                        </Box>
                                        <input
                                            ref={fileInputRef}
                                            id="img"
                                            type="file"
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            onChange={async (e) => {
                                                const files = Array.from(e.target.files || []);
                                                const base64Images = files.map((file) => {
                                                    return new Promise<string>((resolve, reject) => {
                                                        new Compressor(file, {
                                                            quality: 0.3,
                                                            width: 300,
                                                            height: 300,
                                                            success(result) {
                                                                const reader = new FileReader();

                                                                reader.onloadend = () => resolve(reader.result as string);
                                                                reader.readAsDataURL(result);
                                                            },
                                                            error(e) {
                                                                reject(e);
                                                            }
                                                        });
                                                    });
                                                });

                                                if (base64Images.length) handleInputChange('images', [...(product as ProductTypes).images, ...(await Promise.all(base64Images))]);
                                            }}
                                            multiple
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="نام شما" variant="outlined" margin="normal" value={(product as ProductTypes)?.author?.name || ''} onChange={(e) => handleInputChange('author', { name: e.target.value })} disabled={loading} required />
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
                                            <MenuItem onClick={() => setIsCustomOpen(true)} value="سایر">
                                                سایر
                                            </MenuItem>
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
                        {method == 'request' && (
                            <Grid item xs={12}>
                                <TextField fullWidth label="نام شما" variant="outlined" margin="normal" value={name} onChange={(e) => setName(e.target.value)} disabled={loading} required />
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>استان</InputLabel>
                                <Select
                                    required
                                    value={selectedProvince}
                                    onChange={(e) => {
                                        setSelectedProvince(e.target.value);
                                        handleInputChange('location', { ...product.location, province: e.target.value, city: '' });
                                    }}
                                    renderValue={(selected) => selected}>
                                    {Object.keys(proviences_cities).map((province, index) => (
                                        <MenuItem key={index} value={province}>
                                            {province}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth disabled={!selectedProvince}>
                                <InputLabel>شهر</InputLabel>
                                <Select required value={product.location.city || ''} onChange={(e) => handleInputChange('location', { ...product.location, city: e.target.value })} renderValue={(selected) => selected}>
                                    {/* @ts-ignore */}
                                    {proviences_cities[selectedProvince]?.map((city, index) => (
                                        <MenuItem key={index} value={city}>
                                            {city}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required fullWidth label="توضیحات محصول" variant="outlined" multiline rows={4} value={product.description} onChange={(e) => handleInputChange('description', e.target.value)} placeholder="توضیحات محصول را اینجا بنویسید..." />
                        </Grid>
                        <Grid item xs={12}>
                            <Button startIcon={<CategoryIcon />} onClick={() => setIsModalOpen(true)} sx={{ py: 2, display: 'flex', alignItems: 'center', gap: 1, borderColor: 'grey.600' }} variant="outlined" color="inherit" fullWidth>
                                برای انتخاب دسته بندی ها اینجا بزنید
                            </Button>
                            <Box sx={{ mt: 2 }}>{selectedCategories.length > 0 && <Typography variant="body2">دسته بندی‌های انتخاب شده: {selectedCategories}</Typography>}</Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color={method === 'create' ? 'success' : 'secondary'} disabled={loading}>
                                {loading ? <CircularProgress size={24} /> : method === 'create' ? 'ثبت محصول' : 'درخواست محصول'}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Dialog open={isCustomOpen}>
                <DialogTitle sx={{ textAlign: 'center' }}>
                    <Typography variant="body1" sx={{ color: 'white', mb: 1 }}>
                        واحد خود را بنویسید
                    </Typography>
                </DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', justifyItems: 'center', alignItems: 'center' }}>
                    <TextField sx={{ width: '100%' }} value={(product as ProductTypes).unit_of_measurement || ''} onChange={(e) => handleInputChange('unit_of_measurement', e.target.value)} />
                    <Button onClick={() => setIsCustomOpen(false)} sx={{ mt: 2 }}>
                        ذخیره
                    </Button>
                </DialogContent>
            </Dialog>
            <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} fullWidth>
                <DialogTitle>انتخاب دسته بندی</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="جستجو"
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setFilteredCategories(filterCategories(e.target.value, categories));
                        }}
                        sx={{ mb: 2 }}
                    />
                    {currentStep === 'main' && (
                        <Box>
                            <List>
                                {Object.keys(filteredCategories).map((mainCategory, index) => (
                                    <ListItem
                                        key={index}
                                        button
                                        onClick={() => {
                                            setSelectedMainCategory(mainCategory);
                                            setCurrentStep('sub');
                                        }}>
                                        <ListItemText primary={mainCategory} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    )}
                    {currentStep === 'sub' && selectedMainCategory && (
                        <Box>
                            <List>
                                {Object.keys(filteredCategories[selectedMainCategory] || {}).map((subCategory, index) => (
                                    <ListItem
                                        key={index}
                                        button
                                        onClick={() => {
                                            setSelectedSubCategory(subCategory);
                                            setCurrentStep('final');
                                        }}>
                                        <ListItemText primary={subCategory} />
                                    </ListItem>
                                ))}
                                <Button onClick={() => setCurrentStep('main')}>بازگشت</Button>
                            </List>
                        </Box>
                    )}
                    {currentStep === 'final' && selectedSubCategory && (
                        <Box>
                            <List>
                                {/* @ts-ignore */}
                                {filteredCategories[selectedMainCategory]?.[selectedSubCategory]?.map((finalCategory, index) => (
                                    <ListItem
                                        key={index}
                                        button
                                        onClick={() => {
                                            setSelectedCategories([finalCategory]);
                                            handleInputChange('categories', [finalCategory]);
                                        }}>
                                        <Checkbox checked={selectedCategories.includes(finalCategory)} />
                                        <ListItemText primary={finalCategory} />
                                    </ListItem>
                                ))}
                                <Button onClick={() => setCurrentStep('sub')}>بازگشت</Button>
                            </List>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsModalOpen(false)}>بستن</Button>
                    <Button onClick={() => setIsModalOpen(false)} variant="contained">
                        تایید
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
}
