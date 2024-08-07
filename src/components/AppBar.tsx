import React from 'react';
import { AppBar, Toolbar, IconButton, Drawer, Button, Typography, Box, Hidden } from '@mui/material';
import { Menu as MenuIcon, Person, Inventory, LightMode, DarkMode } from '@mui/icons-material';

const ResponsiveAppBar = () => {
    const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);

    const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);

    return (
        <>
            <AppBar position="fixed">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)} sx={{ display: { xs: 'block', sm: 'none' } }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">لوگو</Typography>
                    <Hidden smDown>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button href="/blog" variant="text">بلاگ تناژ</Button>
                            <Button href="/terms-of-service" variant="text">قوانین استفاده از تناژ</Button>
                            <Button href="/contact-us" variant="text">تماس با تناژ</Button>
                            <Button href="/about-us" variant="text">درباره تناژ</Button>
                        </Box>
                    </Hidden>
                    <IconButton color="inherit">
                        <LightMode />
                    </IconButton>
                    <IconButton color="inherit">
                        <DarkMode />
                    </IconButton>
                    <Button variant="outlined" color="info" endIcon={<Person />}>
                        حساب کاربری
                    </Button>
                    <Button variant="contained" color="success" endIcon={<Inventory />}>
                        ثبت محصول
                    </Button>
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
                        <Button href="/blog" variant="text">بلاگ تناژ</Button>
                        <Button href="/terms-of-service" variant="text">قوانین استفاده از تناژ</Button>
                        <Button href="/contact-us" variant="text">تماس با تناژ</Button>
                        <Button href="/about-us" variant="text">درباره تناژ</Button>
                    </Box>
                </Box>
            </Drawer>
        </>
    );
};

export default ResponsiveAppBar;
