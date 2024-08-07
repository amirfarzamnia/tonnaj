'use client';

import { Button, Box, Card, CardActions, CardContent, Divider, Grid, Stack, styled, Typography, CircularProgress, Alert } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BlogTypes } from '@/types/blog';

const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    boxShadow: theme.shadows[3],
    borderRadius: theme.shape.borderRadius * 2,
    transition: 'transform 0.3s, box-shadow 0.3s'
}));

const StyledButton = styled(Button)(({ theme }) => ({
    width: '100%',
    border: '2.5px solid transparent',
    borderRadius: theme.shape.borderRadius * 2,
    textTransform: 'uppercase',
    fontWeight: theme.typography.fontWeightBold,
    transition: 'all 0.2s ease-in'
}));

const BlogList = () => {
    const [blogs, setBlogs] = useState<BlogTypes[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const searchParams = useSearchParams();
    const categories = searchParams.get('categories');

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            setError(null);
            try {
                const url = new URL('/api/blog', location.origin);
                if (categories) {
                    url.searchParams.append('categories', categories);
                }

                const response = await fetch(url.toString());

                if (response.ok) {
                    setBlogs(await response.json());
                } else {
                    throw new Error(`Error fetching data: ${response.status}`);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [categories]);

    if (loading) {
        return (
            <Stack maxWidth={'100%'} alignItems="center" justifyContent="center" height="100vh">
                <CircularProgress />
            </Stack>
        );
    }

    if (error) {
        return (
            <Stack maxWidth={'100%'} alignItems="center" justifyContent="center" height="100vh">
                <Alert severity="error">{error}</Alert>
            </Stack>
        );
    }

    return (
        <Stack maxWidth={'100%'}>
            <Grid container spacing={3} justifyContent="center">
                {blogs.map((blog, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                        <StyledCard>
                            <Box component="img" src={blog.image} loading="lazy" height={'30vh'} sx={{ border: '1px solid white', borderRadius: '10px' }} />
                            <CardContent>
                                <Typography variant="h6" sx={{ textAlign: 'center', mb: 1 }}>
                                    {blog.name}
                                </Typography>
                                <Divider sx={{ mb: 2 }} />
                                <Typography variant="body2" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', height: 95 }}>
                                    {blog.content}
                                </Typography>
                            </CardContent>
                            <Divider />
                            <CardActions sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <StyledButton href={`/blog/${blog.name}`} variant="outlined" color="primary">
                                    ادامه
                                </StyledButton>
                            </CardActions>
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
};

export default BlogList;
