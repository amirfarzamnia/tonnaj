'use client';

import { Button, CircularProgress, TextField, Box, Grid, Divider, Toolbar, AppBar, Link, Container, Typography, InputAdornment, CssBaseline, Shadows, Menu, MenuItem } from '@mui/material';
import { Search, LightMode, DarkMode, Person, Inventory, Logout } from '@mui/icons-material';
import { createTheme, ThemeProvider, ThemeOptions } from '@mui/material/styles';
import { TypographyOptions } from '@mui/material/styles/createTypography';
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

    React.useEffect(() => {
        const theme = (localStorage.getItem('selected-theme') as 'dark' | 'light') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

        setTheme(theme);
        setLoading(false);

        const thenAct = async (response: Response) => setIsAuthenticated((await response.json()) instanceof Object);
        const catchAct = () => setIsAuthenticated(false);

        fetch('/api/sessions').then(thenAct).catch(catchAct);
    }, []);

    const theme = React.useMemo(() => createTheme(schemeOptions[selectedTheme]), [selectedTheme]);

    const handleUserButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => (isAuthenticated ? setAnchorEl(event.currentTarget) : (window.location.href = '/auth'));
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
                                        <Box width={85} component="img" loading="lazy" alt="لوگوی تناژ" src="/tonnaj.png" />
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
                                        sx={{ flexGrow: 1, background: theme.palette.background.default }}
                                    />
                                    <Box sx={{ display: 'flex', overflowX: 'auto', whiteSpace: 'nowrap' }}>
                                        {Object.entries({ 'بلاگ تناژ': '/blog', 'قوانین استفاده از تناژ': '/terms-of-service', 'تماس با تناژ': '/contact-us' }).map(([name, url]) => (
                                            <Button href={url} key={name} sx={{ mx: 1 }}>
                                                {name}
                                            </Button>
                                        ))}
                                    </Box>
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
                            </AppBar>
                            <Container sx={{ padding: 2, borderRadius: 4, mt: 12.5 }} maxWidth={'xl'}>
                                {children}
                            </Container>
                            <Box sx={{ borderTop: 1, borderColor: selectedTheme === 'dark' ? '#3f3f46' : '#e4e4e7', background: selectedTheme === 'dark' ? theme.palette.grey[900] : '#fafafa', py: 4 }} component="footer">
                                <Container>
                                    <Grid container spacing={8}>
                                        <Grid item xs={12} sm={3}>
                                            <Typography variant="h6" gutterBottom>
                                                داستان تناژ
                                            </Typography>
                                            <Typography variant="caption">تناژ از تابستان سال 1403 با هدف تسهیل فرآیند خرید و فروش محصولات عمده در کشور شروع به کار کرد. در تناژ، شما امکان خرید و فروش محصولات عمده، با بیشترین امکانات، بهترین کیفیت، در کمترین زمان را خواهید داشت.</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <Typography variant="h6" gutterBottom>
                                                صفحات اصلی تناژ
                                            </Typography>
                                            <Box component="ul" sx={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                                                <Box component="li">
                                                    <Link underline="hover" href="/products/create">
                                                        ثبت محصول
                                                    </Link>
                                                </Box>
                                                <Box component="li">
                                                    <Link underline="hover" href="/products/request">
                                                        درخواست محصول
                                                    </Link>
                                                </Box>
                                                <Box component="li">
                                                    <Link underline="hover" href="/blog">
                                                        وبلاگ تناژ
                                                    </Link>
                                                </Box>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <Typography variant="h6" gutterBottom>
                                                پیوندهای مفید تناژ
                                            </Typography>
                                            <Box component="ul" sx={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                                                <Box component="li">
                                                    <Link underline="hover" href="/">
                                                        صفحه اصلی تناژ
                                                    </Link>
                                                </Box>
                                                <Box component="li">
                                                    <Link underline="hover" href="/about-us">
                                                        درباره تناژ
                                                    </Link>
                                                </Box>
                                                <Box component="li">
                                                    <Link underline="hover" href="/terms-of-service">
                                                        قوانین استفاده از تناژ
                                                    </Link>
                                                </Box>
                                                <Box component="li">
                                                    <Link underline="hover" href="/privacy-policy">
                                                        حریم خصوصی و امنیت تناژ
                                                    </Link>
                                                </Box>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <Typography variant="h6" gutterBottom>
                                                مجوزهای تناژ
                                            </Typography>
                                            <Box component="img" loading="lazy" src="https://via.placeholder.com/40" alt="Facebook" sx={{ width: 40, height: 40, margin: 1 }} />
                                            <Box component="img" loading="lazy" src="https://via.placeholder.com/40" alt="Twitter" sx={{ width: 40, height: 40, margin: 1 }} />
                                            <Box component="img" loading="lazy" src="https://via.placeholder.com/40" alt="Instagram" sx={{ width: 40, height: 40, margin: 1 }} />
                                        </Grid>
                                    </Grid>
                                </Container>
                                <Divider sx={{ my: 4 }} />
                                <Typography variant="body2" fontSize="smaller" color="text.secondary" align="center">
                                    {new Date().getFullYear()} © تمامی حقوق این وبسایت برای تناژ محفوظ است.
                                </Typography>
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
