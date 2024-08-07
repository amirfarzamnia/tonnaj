'use client';

import { Button, CircularProgress, TextField, Box, Grid, Toolbar, AppBar, Link, Container, Typography, InputAdornment, CssBaseline, Shadows, Menu, MenuItem, List, ListItem } from '@mui/material';
import { Search, LightMode, DarkMode, Person, Inventory, Logout } from '@mui/icons-material';
import { createTheme, ThemeProvider, ThemeOptions } from '@mui/material/styles';
import { TypographyOptions } from '@mui/material/styles/createTypography';
import React from 'react';
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
    const [isBlur, setIsBlur] = React.useState<boolean>(false)
    const [products, setProducts] = React.useState<ProductTypes[]>([]);
    const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);

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

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            <Box component="html" lang="fa-IR" dir="rtl">
                <Box component="body" style={{ backgroundColor: theme.palette.background.default }}>
                    {loading ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: theme.palette.background.default }}>
                            <CircularProgress color="primary" />
                        </Box>
                    ) : (
                        <>
                            <AppBar position="fixed">
                                <Toolbar sx={{ display: 'flex', gap: 2, justifyContent: 'space-between', borderBottom: 1, borderColor: selectedTheme === 'dark' ? '#3f3f46' : '#e4e4e7', px: 3 }}>
                                    <Link href="/" underline="none">
                                        <Box width={85} component="img" loading="lazy" alt="لوگوی تناژ" src="/icons/tonnaj.png" />
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

                                    {isBlur && (
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: '100%',
                                                left: 0,
                                                right: 0,
                                                mt: 1,
                                                zIndex: 1,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Box sx={{ width: "90%", background: theme.palette.background.paper, padding: 1, boxShadow: 3, borderRadius: 2, display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center' }}>
                                                {products.map((item, index) => {
                                                    return <Box sx={{ mt: 2, mb: 2, width: "fit", padding: 1, height: "fit", backgroundColor: "white", borderRadius: 5 }}>
                                                        <Box component={'a'} sx={{ textDecoration: "none" }} href={`/products/${item.id}`} color={'blue'} key={index}>
                                                            <Typography>{item.name}{" "}{item.location.city}</Typography>
                                                        </Box>
                                                    </Box>
                                                })}
                                            </Box>
                                        </Box>
                                    )}

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
                                    <Box sx={{ display: 'flex', overflowX: 'auto', whiteSpace: 'nowrap' }}>
                                        {Object.entries({ 'بلاگ تناژ': '/blog', 'قوانین استفاده از تناژ': '/terms-of-service', 'تماس با تناژ': '/contact-us', 'درباره تناژ': '/about-us' }).map(([name, url]) => (
                                            <Button href={url} key={name} sx={{ mx: 1 }}>
                                                {name}
                                            </Button>
                                        ))}
                                    </Box>
                                </Toolbar>
                            </AppBar>
                            <Container sx={{ padding: 2, borderRadius: 4, mt: 20 }} maxWidth={'xl'}>
                                {children}
                            </Container>
                            <Box sx={{ borderTop: 1, borderColor: selectedTheme === 'dark' ? '#3f3f46' : '#e4e4e7', background: selectedTheme === 'dark' ? theme.palette.grey[900] : '#fafafa', py: 4 }} component="footer">
                                <Container>
                                    <Grid container spacing={4}>
                                        <Grid item xs={12} sm={3}>
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
                                        <Grid item xs={12} sm={3}>
                                            <Typography variant="h6" gutterBottom>
                                                پیوندهای مفید
                                            </Typography>
                                            <Box component="ul" sx={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                                                <Box component="li">
                                                    <Link underline="hover" href="#">
                                                        خانه
                                                    </Link>
                                                </Box>
                                                <Box component="li">
                                                    <Link underline="hover" href="#">
                                                        سامانه اطلاع رسانی تناژ
                                                    </Link>
                                                </Box>
                                                <Box component="li">
                                                    <Link underline="hover" href="#">
                                                        درباره تناژ
                                                    </Link>
                                                </Box>
                                                <Box component="li">
                                                    <Link underline="hover" href="#">
                                                        تماس با تناژ
                                                    </Link>
                                                </Box>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <Typography variant="h6" gutterBottom>
                                                بازار عمده محصولات کشاورزی
                                            </Typography>
                                            <Typography variant="caption">تناژ با شعار "از قلب مزرعه" همراه همیشگی شما فعالین عرصه کشاورزی می باشد.در هر لحظه و در هر زمان تنها با چند کلیک ساده بازار خود را بسازید، دانش خود را بیافزایید، از خدمات بهره مند گردید و فرصت های اقتصادی خود را از طریق مشاوران و متخصصان کشف نمایید.فقط کافیست به جمع خانواده بزرگ تناژ بپیوندید.</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <Typography variant="h6" gutterBottom>
                                                همکاریها و مجوزها
                                            </Typography>
                                            <Box component="img" loading="lazy" src="https://via.placeholder.com/40" alt="Facebook" sx={{ width: 40, height: 40, margin: 1 }} />
                                            <Box component="img" loading="lazy" src="https://via.placeholder.com/40" alt="Twitter" sx={{ width: 40, height: 40, margin: 1 }} />
                                            <Box component="img" loading="lazy" src="https://via.placeholder.com/40" alt="Instagram" sx={{ width: 40, height: 40, margin: 1 }} />
                                        </Grid>
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
