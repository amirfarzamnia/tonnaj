'use client';

import { Button, CircularProgress, TextField, Box, Grid, Toolbar, AppBar, Link, Avatar, Tooltip, Container, Typography, InputAdornment, IconButton, CssBaseline, Shadows } from '@mui/material';
import { Search as SearchIcon, LightMode as LightModeIcon, DarkMode as DarkModeIcon } from '@mui/icons-material';
import { createTheme, ThemeProvider, ThemeOptions } from '@mui/material/styles';
import { TypographyOptions } from '@mui/material/styles/createTypography';
import AuthProvider from '@/contexts/auth';
import ShopProvider from '@/contexts/shop';
import BlogProvider from '@/contexts/blog';
import React from 'react';
import './index.css';

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
        backgroundSize: '20px 20px',
        backgroundPosition: '-40px -40px'
    }
};

const schemeOptions: { dark: ThemeOptions; light: ThemeOptions } = {
    dark: {
        palette: {
            mode: 'dark',
            background: {
                default: 'black'
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
            }
        },
        shadows: Array(25).fill('none') as Shadows
    },
    light: {
        palette: {
            mode: 'light',
            background: {
                default: '#EDEADE'
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
            }
        },
        shadows: Array(25).fill('none') as Shadows
    }
};

export default ({ children }: { children: React.ReactNode }) => {
    const [selectedTheme, setTheme] = React.useState<'dark' | 'light'>('light');
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const theme = (localStorage.getItem('selected-theme') as 'dark' | 'light') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

        setTheme(theme);
        setLoading(false);
    }, []);

    const theme = React.useMemo(() => createTheme(schemeOptions[selectedTheme]), [selectedTheme]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <html lang="fa-IR" dir="rtl">
                <body style={{ backgroundColor: theme.palette.background.default }}>
                    {loading ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: theme.palette.background.default }}>
                            <CircularProgress color="primary" />
                        </Box>
                    ) : (
                        <>
                            <AppBar position="static">
                                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: 1, borderColor: selectedTheme === 'dark' ? '#3f3f46' : '#e4e4e7', px: 3 }}>
                                    <Link href="/" underline="none">
                                        <Box width={150} component="img" alt="لوگوی تناژ" src="/icons/tonnaj.png"></Box>
                                    </Link>
                                    <Box>
                                        <Tooltip title="Toggle theme">
                                            <IconButton
                                                onClick={() => {
                                                    setTheme((previousTheme) => {
                                                        const nextTheme = previousTheme === 'dark' ? 'light' : 'dark';
                                                        localStorage.setItem('selected-theme', nextTheme);
                                                        return nextTheme;
                                                    });
                                                }}
                                                sx={{ p: 0 }}>
                                                {selectedTheme === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Open settings">
                                            <IconButton onClick={() => (location.href = '/auth')} sx={{ p: 0 }}>
                                                <Avatar alt="ا" src="/static/images/avatar/2.jpg" />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </Toolbar>
                                <Toolbar sx={{ borderBottom: 1, borderColor: selectedTheme === 'dark' ? '#3f3f46' : '#e4e4e7' }}>
                                    <TextField
                                        placeholder="جست و جوی محصول..."
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon />
                                                </InputAdornment>
                                            )
                                        }}
                                        variant="outlined"
                                        size="small"
                                    />
                                    <Button variant="outlined">Outlined</Button>
                                </Toolbar>
                                <Toolbar sx={{ borderBottom: 1, borderColor: selectedTheme === 'dark' ? '#3f3f46' : '#e4e4e7', justifyContent: 'center' }}>
                                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                        {['محصولات', 'قیمتها', 'تعرفه خدمات', 'تماس با تناژ', 'خدمات تناژ', 'داستان تناژ', 'بازار عمده تناژ'].map((page) => (
                                            <Button key={page} sx={{ my: 2, display: 'block' }}>
                                                {page}
                                            </Button>
                                        ))}
                                    </Box>
                                </Toolbar>
                            </AppBar>
                            <AuthProvider>
                                <ShopProvider>
                                    <BlogProvider>
                                        <Container sx={{ padding: 2, borderRadius: 4 }} maxWidth={'xl'}>
                                            {children}
                                        </Container>
                                    </BlogProvider>
                                </ShopProvider>
                            </AuthProvider>
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
                                            <Box component="img" src="https://via.placeholder.com/40" alt="Facebook" sx={{ width: 40, height: 40, margin: 1 }} />
                                            <Box component="img" src="https://via.placeholder.com/40" alt="Twitter" sx={{ width: 40, height: 40, margin: 1 }} />
                                            <Box component="img" src="https://via.placeholder.com/40" alt="Instagram" sx={{ width: 40, height: 40, margin: 1 }} />
                                        </Grid>
                                    </Grid>
                                </Container>
                            </Box>
                        </>
                    )}
                </body>
            </html>
        </ThemeProvider>
    );
};
