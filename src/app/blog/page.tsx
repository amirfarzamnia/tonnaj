'use client';

import { Button, Box, Card, Divider, Grid, Typography, CircularProgress, CardContent, Link } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BlogTypes } from '@/types/blog';

export default () => {
    const [error, setError] = useState<string | null>(null);
    const categories = useSearchParams().get('categories');
    const [blogs, setBlogs] = useState<BlogTypes[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch('/api/blog' + (categories ? '?categories=' + categories : ''));
                const json = await response.json();

                setBlogs(json);
            } catch (e) {
                setError(e instanceof Error ? e.message : 'دریافت اطلاعات از دیتابیس با خطا مواجه شد.');
            } finally {
                setLoading(false);
            }
        })();
    }, [categories]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) return <Typography variant="h4">{error}</Typography>;

    return (
        <>
            <Box sx={{ height: '300px', border: 1, borderColor: 'grey.600', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)', backgroundImage: 'url("/images/pages/blog/banner.png")', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center', borderRadius: 4, mb: 10 }}></Box>
            <Grid container spacing={3}>
                {blogs.map(({ content, name, image, categories }, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card sx={{ borderRadius: 4 }}>
                            <Box component="img" src={image} loading="lazy" height="30vh" />
                            <CardContent>
                                <Typography variant="h6" gutterBottom textAlign="center">
                                    {name}
                                </Typography>
                                <Box sx={{ my: 2 }}>
                                    <Divider />
                                </Box>
                                <Typography variant="body1" color="textSecondary" gutterBottom>
                                    {content.slice(0, 150)}...
                                </Typography>
                                <Button href={'/blog/' + name} variant="outlined" color="success" sx={{ width: '100%' }}>
                                    مشاهده
                                </Button>
                                <Box sx={{ my: 2 }}>
                                    <Divider />
                                </Box>
                                <Typography variant="body2" color="textSecondary">
                                    {categories.map((category) => (
                                        <Link href={'?categories=' + category}>{category}</Link>
                                    ))}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};
