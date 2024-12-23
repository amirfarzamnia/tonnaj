'use client';

import { Button, CircularProgress, TextField, Menu, MenuItem, ListItemText, ListItemIcon, Box, Grid, Divider, Toolbar, AppBar, Link, Container, Typography, InputAdornment, CssBaseline, Shadows, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper } from '@mui/material';
import { Search, LightMode, DarkMode, Person, Inventory, Menu as MenuIcon, ArrowLeft, AccountCircle, PeopleAlt, SupervisorAccount, ModeComment } from '@mui/icons-material';
import { createTheme, ThemeProvider, ThemeOptions } from '@mui/material/styles';
import { TypographyOptions } from '@mui/material/styles/createTypography';
import categories from '@/constants/categories';
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
        backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.075) 1px, transparent 0)',
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

export default function ({ children }: { children: React.ReactNode }) {
    const [selectedCategory, setSelectedCategory] = React.useState<Record<string, any> | null>(null);
    const [subMenuAnchorEl, setSubMenuAnchorEl] = React.useState<HTMLElement | null>(null);
    const [logoutModalOpen, setLogoutModalOpen] = React.useState<boolean>(false);
    const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
    const [selectedTheme, setTheme] = React.useState<'dark' | 'light'>('light');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [searchResults, setSearchResults] = React.useState<Array<any>>([]);
    const [timer, setTimer] = React.useState<NodeJS.Timeout | null>(null);
    const [isSearching, setIsSearching] = React.useState<boolean>(false);
    const [searchInput, setsearchInput] = React.useState<string>('');
    const [loading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        const theme = (localStorage.getItem('selected-theme') as 'dark' | 'light') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

        setTheme(theme);
        setLoading(false);

        const thenAct = async (response: Response) => setIsAuthenticated((await response.json()) instanceof Object);
        const catchAct = () => setIsAuthenticated(false);

        fetch('/api/sessions').then(thenAct).catch(catchAct);
    }, []);

    const themeClickHandler = () => {
        setTheme((previousTheme) => {
            const nextTheme = previousTheme === 'dark' ? 'light' : 'dark';

            localStorage.setItem('selected-theme', nextTheme);

            return nextTheme;
        });
    };

    const theme = React.useMemo(() => createTheme(schemeOptions[selectedTheme]), [selectedTheme]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            <Box component="html" lang="fa-IR" dir="rtl">
                <Box component="head">
                    <Box component="title">تناژ - بزرگترین پلتفرم خرید و فروش محصولات عمده در کشور</Box>

                    <Box component="meta" charSet="UTF-8" />
                    <Box component="meta" name="application-name" content="تناژ" />
                    <Box component="meta" name="keywords" content="تناژ، عمده، عمده فروشی، محصولات عمده، خرید، فروش، محصول، درخواست" />
                    <Box component="meta" name="description" content="تناژ - بزرگترین پلتفرم خرید و فروش محصولات عمده در کشور" />
                    <Box component="meta" name="theme-color" content="#feb204" />
                    <Box component="meta" name="copyright" content="تناژ" />
                    <Box component="meta" name="language" content="fa-IR" />
                    <Box component="meta" name="author" content="تناژ" />
                    <Box component="meta" name="owner" content="تناژ" />
                    <Box component="meta" name="reply-to" content="info@tonnaj.com" />
                    <Box component="meta" name="url" content="https://www.tonnaj.com" />
                    <Box component="meta" name="identifier-URL" content="https://www.tonnaj.com" />
                    <Box component="meta" name="robots" content="index, follow" />
                    <Box component="meta" name="googlebot" content="index, follow" />
                    <Box component="meta" name="distribution" content="Global" />
                    <Box component="meta" name="rating" content="safe for kids" />
                    <Box component="meta" name="HandheldFriendly" content="true" />
                    <Box component="meta" name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                    <Box component="meta" name="apple-mobile-web-app-title" content="تناژ" />
                    <Box component="meta" name="apple-mobile-web-app-capable" content="yes" />
                    <Box component="meta" name="apple-touch-fullscreen" content="yes" />
                    <Box component="meta" name="google-site-verification" content="google75ee1535f90f4c09.html" />

                    <Box component="link" rel="manifest" href="/manifest.json" type="application/manifest+json" />
                    <Box component="link" rel="icon" href="/images/icons/tonnaj.png" type="image/png" />
                    <Box component="link" rel="sitemap" href="/sitemap.xml" type="application/xml" />
                </Box>
                <Box component="body" sx={{ backgroundColor: theme.palette.background.default, pb: { xs: 5, sm: 0 } }}>
                    {loading ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: theme.palette.background.default }}>
                            <CircularProgress color="primary" />
                        </Box>
                    ) : (
                        <>
                            <AppBar position="fixed">
                                <Toolbar sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'space-between', borderBottom: 1, borderColor: selectedTheme === 'dark' ? '#3f3f46' : '#e4e4e7', px: 3 }}>
                                    <Link href="/" underline="none">
                                        <Box width="15vw" maxWidth="90px" component="img" loading="lazy" alt="لوگوی تناژ" src="/images/icons/tonnaj.png" />
                                    </Link>
                                    <Button variant="outlined" startIcon={<MenuIcon sx={{ display: { xs: 'none', md: 'flex' } }} />} sx={{ display: { xs: 'flex', md: 'flex' }, alignItems: 'center', gap: { xs: 0, md: 1 }, py: 0.82, px: 2 }} onClick={(event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)}>
                                        <Box sx={{ display: { xs: 'none', md: 'inline' } }}>دسته بندی ها</Box>
                                        <MenuIcon sx={{ display: { md: 'none' } }} />
                                    </Button>
                                    <Box sx={{ flexGrow: 1, position: 'relative' }}>
                                        <TextField
                                            value={searchInput}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                const { value } = event.target;

                                                setsearchInput(value);

                                                if (timer) clearTimeout(timer);

                                                const newTimer = setTimeout(async () => {
                                                    if (value.trim()) {
                                                        setIsSearching(true);

                                                        const response = await fetch('/api/products?search=' + value);
                                                        const results = await response.json();

                                                        setSearchResults(results);
                                                        setIsSearching(false);
                                                    } else {
                                                        setSearchResults([]);
                                                    }
                                                }, 1000);

                                                setTimer(newTimer);
                                            }}
                                            placeholder="جست و جو..."
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Search />
                                                    </InputAdornment>
                                                )
                                            }}
                                            size="small"
                                            fullWidth
                                        />
                                        {searchInput && (
                                            <Paper sx={{ position: 'absolute', zIndex: 10, top: '100%', left: 0, right: 0, mt: 1, maxHeight: 300, overflowY: 'auto' }}>
                                                {isSearching ? (
                                                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                                                        <CircularProgress size={24} />
                                                    </Box>
                                                ) : (
                                                    searchResults.map(({ id, name, description, location, author, images }, index) => (
                                                        <MenuItem key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }} component="a" href={`/products/${name ? '' : 'requests/'}${id}`}>
                                                            <Box component="img" src={images[0]} width="4rem" height="4rem" alt={name || description} sx={{ objectFit: 'cover' }} />
                                                            {name ? `${name} در ${location.city} توسط ${author.name}` : description}
                                                        </MenuItem>
                                                    ))
                                                )}
                                                {!isSearching && searchResults.length === 0 && (
                                                    <Box sx={{ textAlign: 'center', py: 2 }}>
                                                        <Typography variant="body2">نتیجه‌ای یافت نشد</Typography>
                                                    </Box>
                                                )}
                                            </Paper>
                                        )}
                                    </Box>
                                    <Button sx={{ py: 0.82, display: { xs: 'none', sm: 'flex' } }} variant="outlined" color="info" onClick={themeClickHandler}>
                                        {selectedTheme === 'dark' ? <LightMode /> : <DarkMode />}
                                    </Button>
                                    <Button endIcon={<Person />} onClick={() => (isAuthenticated ? setLogoutModalOpen(true) : (location.href = '/auth'))} variant="outlined" color={isAuthenticated ? 'error' : 'info'} sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1, py: 0.82 }}>
                                        {isAuthenticated ? 'خروج از حساب' : 'ورود به حساب'}
                                    </Button>
                                    <Button endIcon={<Inventory />} href="/products/create" variant="contained" color="success" sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1.25, py: 0.82 }}>
                                        ثبت محصول
                                    </Button>
                                </Toolbar>
                            </AppBar>
                            <Container sx={{ padding: 2, borderRadius: 4, mt: 12.5 }} maxWidth="xl">
                                {children}
                            </Container>
                            <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0, display: { xs: 'block', sm: 'none' } }}>
                                <Toolbar sx={{ display: 'flex', pt: 1, justifyContent: 'space-between', borderTop: 1, borderColor: selectedTheme === 'dark' ? '#3f3f46' : '#e4e4e7' }}>
                                    <Button sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.25, fontSize: 11 }} size="small" onClick={() => (isAuthenticated ? setLogoutModalOpen(true) : (location.href = '/auth'))}>
                                        <AccountCircle />
                                        {isAuthenticated ? 'خروج از حساب' : 'ورود به حساب'}
                                    </Button>
                                    <Button sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.25, fontSize: 11 }} size="small" href="/products/create">
                                        <ModeComment />
                                        پیام ها
                                    </Button>
                                    <Button sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.25, fontSize: 11 }} size="small" href="/products/create">
                                        <Inventory />
                                        ثبت محصول
                                    </Button>
                                    <Button sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.25, fontSize: 11 }} size="small" href="/products/create">
                                        <SupervisorAccount />
                                        خریداران
                                    </Button>
                                    <Button sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.25, fontSize: 11 }} size="small" href="/products/create">
                                        <PeopleAlt />
                                        فروشندگان
                                    </Button>
                                </Toolbar>
                            </AppBar>
                            <Box sx={{ textAlign: { xs: 'center', sm: 'start' }, borderTop: 1, borderColor: selectedTheme === 'dark' ? '#3f3f46' : '#e4e4e7', background: selectedTheme === 'dark' ? theme.palette.grey[900] : '#fafafa', py: 4 }} component="footer">
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
                                                <Box component="li">
                                                    <Link underline="hover" href="/contact-us">
                                                        تماس با تناژ
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
                            <Dialog open={logoutModalOpen} onClose={() => setLogoutModalOpen(false)}>
                                <DialogTitle>تأیید خروج</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>آیا مطمئن هستید که می‌خواهید از حساب کاربری خود خارج شوید؟</DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => setLogoutModalOpen(false)} color="primary" variant="contained">
                                        لغو
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            fetch('/api/sessions', { method: 'DELETE' }).then(() => {
                                                setIsAuthenticated(false);
                                                setLogoutModalOpen(false);
                                            });
                                        }}
                                        color="error">
                                        خروج
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </>
                    )}
                </Box>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => {
                        setAnchorEl(null);
                        setSubMenuAnchorEl(null);
                    }}
                    sx={{ mt: 3.4 }}>
                    {Object.entries(categories).map(([category, subcategories]) => (
                        // @ts-ignore
                        <MenuItem
                            key={category}
                            onClick={(event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
                                setSelectedCategory(subcategories);
                                setSubMenuAnchorEl(event.currentTarget);
                            }}>
                            <ListItemText primary={category} />
                            <ListItemIcon>
                                <ArrowLeft />
                            </ListItemIcon>
                        </MenuItem>
                    ))}
                </Menu>
                <Menu anchorEl={subMenuAnchorEl} open={Boolean(subMenuAnchorEl)} onClose={() => setSubMenuAnchorEl(null)} sx={{ mt: 0.9 }} anchorOrigin={{ vertical: 'top', horizontal: 'left' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
                    {selectedCategory && (
                        <Box sx={{ maxWidth: { md: '75vw', lg: '50vw' } }}>
                            {Object.entries(selectedCategory).map(([subcategory, items], index) => (
                                <Box sx={{ ...(index > 0 && { mt: 5 }), px: 0.25 }}>
                                    <Link fontWeight="bold" color="inherit" href={'/products?categories=' + subcategory} variant="body1" underline="hover">
                                        {subcategory}
                                    </Link>
                                    <Box component="hr" sx={{ border: 0, borderTop: 1, borderColor: 'grey.200', width: '100%' }}></Box>
                                    {items.map((item: string) => (
                                        <Button href={'/products?categories=' + item}>{item}</Button>
                                    ))}
                                </Box>
                            ))}
                        </Box>
                    )}
                </Menu>
            </Box>
        </ThemeProvider>
    );
}
