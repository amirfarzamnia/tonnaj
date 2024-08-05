'use client';

import { useBlog } from '@/contexts/blog';
import { BlogTypes } from '@/types/blog';
import { Box, CardMedia, Container, Divider, Link, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export default ({ params }: { params: { id: string } }) => {
    const { blogItems } = useBlog();
    const [blog, setBlog] = useState<BlogTypes>();
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        if (params.id) {
            const findBlog = blogItems.find((item) => item.id == params.id);

            findBlog != undefined ? setBlog(findBlog) : setError(true);
        }
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
                        <Box
                            sx={{
                                backgroundColor: 'blanchedalmond',
                                padding: '3px',
                                marginBottom: '15px',
                                borderRadius: '10px',
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '10px'
                            }}
                            dir="ltr">
                            {blog?.categories.map((item, index) => (
                                <Link variant="h4" sx={{ color: 'blue' }} href={`/blog/categories/${encodeURI(item)}`} key={index}>
                                    {item}
                                </Link>
                            ))}
                        </Box>
                    </Box>
                </Container>
            )}
        </Stack>
    );
};
