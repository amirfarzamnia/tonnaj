'use client';

import { Button, Box, Card, Divider, Grid, Stack, Typography, CircularProgress } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BlogTypes } from '@/types/blog';

export default () => {
    const [error, setError] = useState<string | null>(null);
    const [blogs, setBlogs] = useState<BlogTypes[]>([]);
    const [loading, setLoading] = useState(true);

    const searchParams = useSearchParams();
    const categories = searchParams.get('categories');

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
        <Stack maxWidth={'100%'}>
            <Grid container spacing={3} justifyContent="center">
                {blogs.map(({ content, name, image, categories }, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card sx={{ borderRadius: 4 }}>
                            <Box component="img" src={image} loading="lazy" height={'30vh'} />
                            <Typography variant="h6" sx={{ textAlign: 'center', mb: 1 }}>
                                {name}
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Typography variant="body2" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', height: 95 }}>
                                {content}
                            </Typography>
                            <Divider />
                            <Button href={'/blog/' + name} variant="outlined" color="success" sx={{ width: '100%' }}>
                                مشاهده
                            </Button>
                            <Box sx={{ my: 2 }}>
                                <Divider />
                            </Box>
                            <Typography variant="body2" color="textSecondary">
                                {categories.map((category, index) => (
                                    <Box component="small" key={index}>
                                        {category}
                                    </Box>
                                ))}
                            </Typography>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
};
