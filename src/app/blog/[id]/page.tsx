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

        <Stack justifyItems={'center'} alignItems={'center'} sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: "center" }}>
            {error ? <Container sx={{ width: '100%', height: "40vh", display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant='h3'>
                    بلاگ پیدا نشد
                </Typography>
            </Container> : <Container sx={{ minHeight: "60vh", margin: '0px', padding: '0px', }} maxWidth={'xl'}>
                <Container sx={{ minHeight: '80vh' }} maxWidth={'xl'}>
                    <Container maxWidth={'xl'} sx={{ height: "auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Typography variant='h3' >{blog?.title}</Typography>
                    </Container>
                    <Divider sx={{ width: "100%", mt: "10px", mb: "20px" }} />
                    <Container maxWidth={'xl'}>
                        {blog?.page}
                    </Container>
                </Container>
                <Divider sx={{ width: "100%", mt: "10px", mb: "20px" }} />
                <Container>

                    <Container sx={{ backgroundColor: "blanchedalmond", padding: '3px', marginBottom: "15px", borderRadius: "10px" }} dir='ltr'>
                        {blog?.categories.map((item, index) => {
                            return <Link variant='h4' sx={{ color: "blue" }} href={`/blog/categories/${encodeURI(item)}`} key={index}>{item}</Link>
                        })}
                    </Container>

                </Container>
            </Container>}
        </Stack>
    );
};
