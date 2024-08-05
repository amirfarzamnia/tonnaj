'use client';

import { Button, CircularProgress, TextField, Box, Grid, Toolbar, AppBar, Link, Avatar, Tooltip, Container, Typography, InputAdornment, IconButton, CssBaseline, Shadows, MenuItem, Stack, List, ListItem, ListItemText } from '@mui/material';
import { Search as SearchIcon, LightMode as LightModeIcon, DarkMode as DarkModeIcon, Menu } from '@mui/icons-material';
import { createTheme, ThemeProvider, ThemeOptions } from '@mui/material/styles';
import AuthProvider from '@/contexts/auth';
import ShopProvider from '@/contexts/shop';
import BlogProvider from '@/contexts/blog';
import React, { useState } from 'react';
import './index.css';

const common = {
    Typography: {
        h1: { color: '#d00434' },
        h2: { color: '#d00434' },
        h3: { color: '#d00434' },
        h4: { color: '#d00434' },
        h5: { color: '#d00434' },
        h6: { color: '#d00434' }
    },
    MuiCssBaseline: {
        body: {
            backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 0)',
            backgroundSize: '20px 20px',
            backgroundPosition: '-40px -40px'
        }
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
                        ...common.MuiCssBaseline.body,
                        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 0)'
                    }
                }
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        backgroundColor: 'rgba(255, 255, 255, 0)'
                    }
                }
            },
            MuiTypography: {
                styleOverrides: common.Typography
            }
        },
        shadows: Array(25).fill('none') as Shadows
    },
    light: {
        palette: {
            mode: 'light',
            background: {
                default: 'white'
            }
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: common.MuiCssBaseline.body
                }
            },
            MuiTypography: {
                styleOverrides: common.Typography
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
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
                            <Box sx={{
                                position: "fixed",
                                top: isOpen ? 0 : '-100vh', // Slide down when isOpen is true, slide up when false
                                width: '100%',
                                height: "100vh",
                                transition: 'top 0.5s ease', // Transition for sliding effect
                                backgroundColor: "black",
                                zIndex: 50,
                                display: "flex",
                                flexDirection: 'column',
                                alignItems: "center",
                                justifyContent: 'start'
                            }}>
                                <Box sx={{ width: "100%", display: 'flex', justifyContent: 'end', alignItems: 'center', padding: '1px', borderBottom: 2 }} >
                                    <MenuItem sx={{ ml: 1, color: 'white' }} onClick={() => setIsOpen(false)}>بستن</MenuItem>
                                </Box>

                                <Box sx={{ width: "100%", display: 'flex', justifyContent: 'end', alignItems: 'center', padding: '1px', position: 'relative', mt: 2 }} >
                                    <MenuItem
                                        sx={{ ml: 1, color: 'white' }}
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    >
                                        فروشگاه
                                    </MenuItem>
                                    {isDropdownOpen && (
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: '100%',
                                                right: 0,
                                                backgroundColor: 'black',
                                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                                zIndex: 100,
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: "center",
                                                alignItems: 'center',
                                            }}
                                        >
                                            <List sx={{ width: '100%' }}>
                                                <ListItem button>
                                                    <ListItemText primary="Item 1" sx={{ color: 'white', ml: 2 }} />
                                                </ListItem>
                                                <ListItem button>
                                                    <ListItemText primary="Item 2" sx={{ color: 'white', ml: 2 }} />
                                                </ListItem>
                                                <ListItem button>
                                                    <ListItemText primary="Item 3" sx={{ color: 'white', ml: 2 }} />
                                                </ListItem>
                                            </List>
                                        </Box>
                                    )}
                                </Box>
                            </Box>

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
                                    <Box sx={{ width: "100%", height: "5vh", display: "flex", justifyContent: 'end', alignItems: 'center' }} maxWidth={'100%'}>
                                        <Menu sx={{ padding: '2px', borderRadius: "10px", transition: "all .1s ease", fontSize: "30px", border: "2px solid transparent", ":active": { border: "2px solid white" } }} onClick={() => setIsOpen(true)} />
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
