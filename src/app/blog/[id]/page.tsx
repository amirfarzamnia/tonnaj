'use client'

import { useBlog } from '@/contexts/blog';
import { BlogTypes } from '@/types/types';
import { Container, Divider, Link, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export default ({ params }: { params: { id: string } }) => {
    const { blogItems } = useBlog()
    const [blog, setBlog] = useState<BlogTypes>()
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
        if (params.id) {
            const findBlog = blogItems.find(item => item.id == params.id)

            findBlog != undefined ? setBlog(findBlog) : setError(true)
        }
    }, [params.id])

    return (

        <Stack
            justifyContent="center"
            alignItems="center"
            sx={{ width: '100%', minHeight: '100vh', bgcolor: 'background.default', p: 3 }}
        >
            {error ? (
                <Container
                    sx={{
                        width: '100%',
                        height: "40vh",
                        display: "flex",
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'background.paper',
                        boxShadow: 1,
                        borderRadius: 2,
                        p: 2
                    }}
                >
                    <Typography variant='h4' color='error'>
                        بلاگ پیدا نشد
                    </Typography>
                </Container>
            ) : (
                <Container
                    maxWidth="xl"
                    sx={{
                        minHeight: "60vh",
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 3,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 1
                    }}
                >
                    <Typography variant='h3' sx={{ mb: 2 }}>
                        {blog?.title}
                    </Typography>
                    <Divider sx={{ width: "100%", my: 2 }} />
                    <Container
                        maxWidth="xl"
                        sx={{ width: '100%', mb: 2 }}
                    >
                        {blog?.page}
                    </Container>
                    <Divider sx={{ width: "100%", my: 2 }} />
                    <Container
                        sx={{
                            backgroundColor: "blanchedalmond",
                            padding: 2,
                            borderRadius: 2,
                            width: '100%',
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 1
                        }}
                    >
                        {blog?.categories.map((item, index) => (
                            <Link
                                href={`/blog/categories/${encodeURI(item)}`}
                                key={index}
                                sx={{
                                    color: "primary.main",
                                    fontSize: '1.2rem',
                                    textDecoration: 'none',
                                    '&:hover': {
                                        textDecoration: 'underline'
                                    }
                                }}
                            >
                                {item}
                            </Link>
                        ))}
                    </Container>
                </Container>
            )}
        </Stack>
    );
};
