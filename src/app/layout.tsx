'use client';

import React from 'react';
import { Button, CircularProgress, TextField, Box, Grid, Toolbar, AppBar, Link, Container, Typography, InputAdornment, CssBaseline, Shadows, Menu, MenuItem, Drawer, IconButton, Divider } from '@mui/material';
import { Search, LightMode, DarkMode, Person, Inventory, Logout, Menu as MenuIcon } from '@mui/icons-material';
import { createTheme, ThemeProvider, ThemeOptions } from '@mui/material/styles';
import { TypographyOptions } from '@mui/material/styles/createTypography';
import './index.css';
import 'leaflet/dist/leaflet.css';
import { ProductTypes } from '@/types/product';

const common: { typography: TypographyOptions; css: React.CSSProperties } = {
    typography: {
        h1: { color: '#d00434' },
        h2: { color: '#d00434' },
        h3: { color: '#d00434' },
        h4: { color: '#d00434' },
        h5: { color: '#d00434' },
        h6: { color: '#d00434' }
    },
    css: {
        backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 0)',
        backgroundPosition: '-40px -40px',
        backgroundSize: '20px 20px'
    }
};

const schemeOptions: { dark: ThemeOptions; light: ThemeOptions } = {
    dark: {
        palette: {
            mode: 'dark',
            background: {
                default: '#28282B'
            }
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        ...common.css,
                        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 0)'
                    }
                }
            },
            MuiTypography: {
                styleOverrides: common.typography
            },
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        background: '#212121'
                    }
                }
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        border: '1px solid #3f3f46',
                        background: '#212121'
                    }
                }
            }
        },
        shadows: Array(25).fill('none') as Shadows
    },
    light: {
        palette: {
            mode: 'light',
            background: {
                default: '#f0f0f0'
            }
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: common.css
                }
            },
            MuiTypography: {
                styleOverrides: common.typography
            },
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        background: '#fafafa'
                    }
                }
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        border: '1px solid #e4e4e7'
                    }
                }
            }
        },
        shadows: Array(25).fill('none') as Shadows
    }
};

export default ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
    const [selectedTheme, setTheme] = React.useState<'dark' | 'light'>('light');
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [isBlur, setIsBlur] = React.useState<boolean>(false);
    const [products, setProducts] = React.useState<ProductTypes[]>([]);
    const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);

    // State for controlling Drawer
    const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);

    React.useEffect(() => {
        const theme = (localStorage.getItem('selected-theme') as 'dark' | 'light') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

        setTheme(theme);
        setLoading(false);

        const thenAct = async (response: Response) => setIsAuthenticated((await response.json()) instanceof Object);
        const catchAct = () => setIsAuthenticated(false);

        fetch('/api/sessions').then(thenAct).catch(catchAct);
    }, []);

    React.useEffect(() => {
        (async () => {
            try {
                const urlParams = new URLSearchParams(location.search);
                const categories = urlParams.get('categories')?.split(',') || [];

                setSelectedCategories(categories);

                if (categories.length > 0) urlParams.set('categories', categories.join(','));

                const response = await fetch('/api/products?' + urlParams.toString());
                const data = await response.json();

                setProducts(data);
            } catch {
                // setError('دریافت اطلاعات از دیتابیس با خطا مواجه شد.');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const theme = React.useMemo(() => createTheme(schemeOptions[selectedTheme]), [selectedTheme]);

    const handleUserButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => (isAuthenticated ? setAnchorEl(event.currentTarget) : (location.href = '/auth'));
    const handleMenuClose = () => setAnchorEl(null);
    const handleLogout = () => {
        setIsAuthenticated(false);
        setAnchorEl(null);
    };

    // Toggle Drawer
    const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            <Box component="html" lang="fa-IR" dir="rtl" sx={{ overflowX: 'hidden' }}>
                <Box component="body" sx={{ backgroundColor: theme.palette.background.default, overflowX: 'hidden' }}>
                    {loading ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: theme.palette.background.default }}>
                            <CircularProgress color="primary" />
                        </Box>
                    ) : (
                        <>
                            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                                <Toolbar sx={{ display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'space-between', borderBottom: 1, borderColor: selectedTheme === 'dark' ? '#3f3f46' : '#e4e4e7', px: 3 }}>
                                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)} sx={{ display: { xs: 'block', sm: 'none' } }}>
                                        <MenuIcon />
                                    </IconButton>
                                    <Link href="/" underline="none">
                                        <Box width={{ xs: 60, sm: 85 }} component="img" loading="lazy" alt="لوگوی تناژ" src="/icons/tonnaj.png" />
                                    </Link>
                                    <TextField
                                        placeholder="جست و جوی محصول..."
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Search />
                                                </InputAdornment>
                                            )
                                        }}
                                        variant="outlined"
                                        size="small"
                                        onClick={() => setIsBlur(true)}
                                        onBlur={() => setIsBlur(false)}
                                        sx={{ flexGrow: 1, background: theme.palette.background.default }}
                                    />
                                    <Button
                                        sx={{ py: 0.82 }}
                                        variant="outlined"
                                        color="info"
                                        onClick={() => {
                                            setTheme((previousTheme) => {
                                                const nextTheme = previousTheme === 'dark' ? 'light' : 'dark';

                                                localStorage.setItem('selected-theme', nextTheme);

                                                return nextTheme;
                                            });
                                        }}>
                                        {selectedTheme === 'dark' ? <LightMode /> : <DarkMode />}
                                    </Button>
                                    <Button endIcon={<Person />} onClick={handleUserButtonClick} variant="outlined" color="info" sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 0.82 }}>
                                        حساب کاربری
                                    </Button>
                                    <Button endIcon={<Inventory />} href="/products/create" variant="contained" color="success" sx={{ display: 'flex', alignItems: 'center', gap: 1.25, py: 0.82 }}>
                                        ثبت محصول
                                    </Button>
                                </Toolbar>
                                <Toolbar sx={{ borderBottom: 1, borderColor: selectedTheme === 'dark' ? '#3f3f46' : '#e4e4e7', justifyContent: 'center' }}>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                                        {Object.entries({ 'بلاگ تناژ': '/blog', 'قوانین استفاده از تناژ': '/terms-of-service', 'تماس با تناژ': '/contact-us', 'درباره تناژ': '/about-us' }).map(([name, url]) => (
                                            <Button href={url} key={name} sx={{ mx: 1, whiteSpace: 'nowrap' }}>
                                                {name}
                                            </Button>
                                        ))}
                                    </Box>
                                </Toolbar>
                            </AppBar>
                            <Drawer
                                anchor="top"
                                open={drawerOpen}
                                onClose={toggleDrawer(false)}
                                sx={{
                                    '& .MuiDrawer-paper': {
                                        width: '100%',
                                        height: '100%',
                                        overflow: 'auto',
                                    }
                                }}
                            >
                                <Box sx={{ p: 2 }}>
                                    <Toolbar>
                                        <IconButton edge="start" color="inherit" onClick={toggleDrawer(false)} sx={{ mr: 1 }}>
                                            <MenuIcon />
                                        </IconButton>
                                        <Typography variant="h6">منو</Typography>
                                    </Toolbar>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                        {Object.entries({ 'بلاگ تناژ': '/blog', 'قوانین استفاده از تناژ': '/terms-of-service', 'تماس با تناژ': '/contact-us', 'درباره تناژ': '/about-us' }).map(([name, url]) => (
                                            <Button href={url} key={name} sx={{ textAlign: 'left' }}>
                                                {name}
                                            </Button>
                                        ))}
                                    </Box>
                                </Box>
                            </Drawer>
                            <Box sx={{ pt: '64px' }}> {/* Ensure content is below the AppBar */}
                                <Container sx={{ padding: 2, borderRadius: 4 }} maxWidth={'xl'}>
                                    {children}
                                </Container>
                            </Box>
                            <Box sx={{ borderTop: 1, borderColor: selectedTheme === 'dark' ? '#3f3f46' : '#e4e4e7', background: selectedTheme === 'dark' ? theme.palette.grey[900] : '#fafafa', py: 4 }} component="footer">
                                <Container>
                                    <Grid container spacing={4}>
                                        <Grid item xs={12} sm={6} md={3}>
                                            <Typography variant="h6" gutterBottom>
                                                پیشخوان خدمات
                                            </Typography>
                                            <Box component="ul" sx={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                                                <Box component="li">
                                                    <Link underline="hover" href="#">
                                                        بازار فروش عمده
                                                    </Link>
                                                </Box>
                                                <Box component="li">
                                                    <Link underline="hover" href="#">
                                                        بازار خرده فروشی
                                                    </Link>
                                                </Box>
                                                <Box component="li">
                                                    <Link underline="hover" href="#">
                                                        روستابان
                                                    </Link>
                                                </Box>
                                                <Box component="li">
                                                    <Link underline="hover" href="#">
                                                        قیمتبان
                                                    </Link>
                                                </Box>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={3}>
                                            <Typography variant="h6" gutterBottom>
                                                پیوندهای مفید
                                            </Typography>
                                            <Box component="ul" sx={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                                                <Box component="li">
                                                    <Link underline="hover" href="/">
                                                        خانه
                                                    </Link>
                                                </Box>
                                                <Box component="li">
                                                    <Link underline="hover" href="/blog">
                                                        سامانه اطلاع رسانی تناژ
                                                    </Link>
                                                </Box>
                                                <Box component="li">
                                                    <Link underline="hover" href="about-us">
                                                        درباره تناژ
                                                    </Link>
                                                </Box>
                                                <Box component="li">
                                                    <Link underline="hover" href="contact-us">
                                                        تماس با تناژ
                                                    </Link>
                                                </Box>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={3}>
                                            <Typography variant="h6" gutterBottom>
                                                بازار عمده محصولات کشاورزی
                                            </Typography>
                                            <Typography variant="caption">
                                                تناژ با هدف تسهیل فرآیند خرید و فروش محصولات کشاورزی و ارائه خدماتی مانند جستجوی محصولات، مقایسه قیمت‌ها، و مشاهده جزئیات محصول فعالیت می‌کند. این وبسایت همچنین اطلاعات و مشاوره‌های تخصصی در زمینه بازار کشاورزی ارائه می‌دهد و با ارائه پشتیبانی مشتری و خدمات اضافی، تجربه‌ای راحت و مطمئن برای کاربران فراهم می‌آورد. با طراحی واکنش‌گرا و توجه به فناوری‌های نوین، تناژ به کاربران این امکان را می‌دهد که از هر دستگاهی، از جمله گوشی‌های موبایل، تبلت‌ها و رایانه‌های رومیزی، به راحتی از خدمات وبسایت بهره‌برداری کنند.
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={3}>
                                            <Typography variant="h6" gutterBottom>
                                                همکاریها و مجوزها
                                            </Typography>
                                            <Box component="img" loading="lazy" src="https://via.placeholder.com/40" alt="Facebook" sx={{ width: 40, height: 40, margin: 1 }} />
                                            <Box component="img" loading="lazy" src="https://via.placeholder.com/40" alt="Twitter" sx={{ width: 40, height: 40, margin: 1 }} />
                                            <Box component="img" loading="lazy" src="https://via.placeholder.com/40" alt="Instagram" sx={{ width: 40, height: 40, margin: 1 }} />
                                        </Grid>

                                        <Divider sx={{ width: "100%", height: '2vh', mt: 2 }} />

                                        <Box sx={{ display: 'flex', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }} width={'100%'}>
                                            <Typography variant='caption' sx={{ mt: 2, }}>
                                                هر گونه کپی برداری از تناژ پیگرد قانونی دارد
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Container>
                            </Box>
                        </>
                    )}
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                        <MenuItem onClick={handleLogout} sx={{ display: 'flex', alignItems: 'center', gap: 1, color: theme.palette.error.main }}>
                            <Logout />
                            خروج
                        </MenuItem>
                    </Menu>
                </Box>
            </Box>
        </ThemeProvider>
    );
};
