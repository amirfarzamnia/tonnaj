'use client';

import { Box, Button, CardMedia, Container, Divider, Link, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import blogItems from '@/constants/posts';
import { BlogTypes } from '@/types/blog';
import { useRouter } from 'next/navigation';

export default ({ params }: { params: { id: string } }) => {
    const [blog, setBlog] = useState<BlogTypes>();
    const [error, setError] = useState<boolean>(false);
    const router = useRouter()

    useEffect(() => {
        if (!params.id) return;

        const blog = blogItems.find(({ id }) => id == params.id);

        blog ? setBlog(blog) : setError(true);
    }, [params.id]);

    return (
        <Stack justifyContent="center" alignItems="center" sx={{ width: '100%' }}>
            {error ? (
                <Container sx={{ width: '100%', height: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="h3">بلاگ پیدا نشد</Typography>
                </Container>
            ) : (
                <Container sx={{ minHeight: '60vh', padding: '0px', margin: '0px' }} maxWidth="xl">
                    <Box sx={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <CardMedia component="img" loading="lazy" src={blog?.image} sx={{ height: 250, width: 400, mb: 2, borderRadius: '10px', border: '3px solid' }} />
                        <Typography variant="h3" sx={{ mb: 2 }}>
                            {blog?.title}
                        </Typography>
                        <Divider sx={{ width: '100%', my: 2 }} />
                        <Box sx={{ minHeight: '50vh' }}>{blog?.page}</Box>
                        <Divider sx={{ width: '100%', my: 2 }} />
                        <Box sx={{ backgroundColor: 'blanchedalmond', padding: '5px', marginBottom: '15px', borderRadius: '10px', display: 'flex', flexWrap: 'wrap', gap: '10px', minWidth: '50%' }} dir="ltr">
                            {blog?.categories.map((item, index) => (
                                <Button size='large' sx={{ color: 'blue', fontSize: '20px' }} variant='contained' key={index} onClick={() => router.push(`/blog/categories/${encodeURI(item)}`)}>
                                    {item}
                                </Button>
                            ))}
                        </Box>
                    </Box>
                </Container>
            )}
        </Stack>
    );
};
