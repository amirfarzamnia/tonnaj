'use client';

import { Button, Box, Toolbar, AppBar, Menu, Avatar, Tooltip, MenuItem, Container, Typography, IconButton, CssBaseline, Shadows } from '@mui/material';
import { Search as SearchIcon, Menu as MenuIcon, LightMode as LightModeIcon, DarkMode as DarkModeIcon } from '@mui/icons-material';
import { createTheme, ThemeProvider, ThemeOptions } from '@mui/material/styles';
import AdbIcon from '@mui/icons-material/Adb';
import * as React from 'react';
import './index.css';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const schemeOptions: { dark: ThemeOptions; light: ThemeOptions } = {
    dark: {
        palette: {
            mode: 'dark'
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 0)',
                        backgroundSize: '20px 20px',
                        backgroundPosition: '-40px -40px'
                    }
                }
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        backgroundColor: 'rgba(255, 255, 255, 0)'
                    }
                }
            }
        },
        shadows: Array(25).fill('none') as Shadows
    },
    light: {
        palette: {
            mode: 'light'
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        background: 'rgba(245, 245, 245)',
                        backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 0)',
                        backgroundSize: '20px 20px',
                        backgroundPosition: '-40px -40px'
                    }
                }
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        backgroundColor: 'rgba(0, 0, 0, 0)'
                    }
                }
            }
        },
        shadows: Array(25).fill('none') as Shadows
    }
};

export default ({ children }: { children: React.ReactNode }) => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [darkMode, setDarkMode] = React.useState<boolean>(window.matchMedia('(prefers-color-scheme: dark)').matches);

    const theme = React.useMemo(() => createTheme(schemeOptions[darkMode ? 'dark' : 'light']), [darkMode]);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElNav(event.currentTarget);
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElUser(event.currentTarget);

    const handleCloseNavMenu = () => setAnchorElNav(null);
    const handleCloseUserMenu = () => setAnchorElUser(null);

    const toggleTheme = () => setDarkMode((prevMode) => !prevMode);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <html lang="fa-IR" dir="rtl">
                <body>
                    <AppBar position="static">
                        <Container maxWidth="xl">
                            <Toolbar disableGutters>
                                <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                                <Typography variant="h6" noWrap component="a" href="#app-bar-with-responsive-menu" sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none' }}>
                                    LOGO
                                </Typography>
                                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                    <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
                                        <MenuIcon />
                                    </IconButton>
                                    <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'left' }} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu} sx={{ display: { xs: 'block', md: 'none' } }}>
                                        {pages.map((page) => (
                                            <MenuItem key={page} onClick={handleCloseNavMenu}>
                                                <Typography textAlign="center">{page}</Typography>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </Box>
                                <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                                <Typography variant="h5" noWrap component="a" href="#app-bar-with-responsive-menu" sx={{ mr: 2, display: { xs: 'flex', md: 'none' }, flexGrow: 1, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none' }}>
                                    LOGO
                                </Typography>
                                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                    {pages.map((page) => (
                                        <Button key={page} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                                            {page}
                                        </Button>
                                    ))}
                                </Box>
                                <Box sx={{ flexGrow: 0 }}>
                                    <Tooltip title="Toggle theme">
                                        <IconButton onClick={toggleTheme} sx={{ p: 0 }}>
                                            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
                                        {settings.map((setting) => (
                                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                                <Typography textAlign="center">{setting}</Typography>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </Box>
                            </Toolbar>
                        </Container>
                        <Toolbar>
                            <div className="relative border rounded-sm border-slate-100 border-opacity-25 w-52 hover:bg-gray-600 hover:bg-opacity-5 hover:w-96 transition-all duration-500">
                                <div className="px-2 h-full absolute pointer-events-none flex items-center justify-center">
                                    <SearchIcon />
                                </div>
                                <input className="outline-none py-2 pr-4 bg-transparent" placeholder="...جست و جوی محصول" aria-label="search" />
                            </div>
                        </Toolbar>
                        <Toolbar>
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                                {['محصولات', 'قیمتها', 'تعرفه خدمات', 'تماس با تناژ', 'خدمات تناژ', 'داستان تناژ', 'بازار عمده تناژ'].map((page) => (
                                    <Button key={page} sx={{ my: 2, color: 'white', display: 'block' }}>
                                        {page}
                                    </Button>
                                ))}
                            </Box>
                        </Toolbar>
                    </AppBar>
                    {children}
                </body>
            </html>
        </ThemeProvider>
    );
};
