'use client';

import { Box, Button, CardMedia, Container, Divider, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import blogItems from '@/constants/posts';
import { BlogTypes } from '@/types/blog';
import { usePathname, useRouter } from 'next/navigation';

export default ({ params }: { params: { name: string } }) => {
    const [blog, setBlog] = useState<BlogTypes>();
    const [error, setError] = useState<boolean>(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const router = useRouter();
    const pathname = usePathname()
    const decodedName = decodeURI(params.name);

    useEffect(() => {
        if (!params.name) return;

        const req = async () => {
            const url = `/api/blog?name=${decodeURI(pathname.split('/')[2])}`
            const res = await fetch(url)
            const json = await res.json()
            setBlog(json.data)
        }

        req()
    }, [params.name]);

    const handleCategoryClick = (category: string) => {
        let updatedCategories = [...selectedCategories];
        if (updatedCategories.includes(category)) {
            // Remove category if already selected
            updatedCategories = updatedCategories.filter(c => c !== category);
        } else {
            // Add category if not selected
            updatedCategories.push(category);
        }
        setSelectedCategories(updatedCategories);
        const query = updatedCategories.length > 0 ? `?categories=${encodeURI(updatedCategories.join(','))}` : '';
        router.push(`/blog${query}`);
    };

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
                        <Box component={'div'} sx={{ mb: 2 }}>
                            {blog?.name}
                        </Box>
                        <Divider sx={{ width: '100%', my: 2 }} />
                        <Box sx={{ minHeight: '50vh' }}>{blog?.content}</Box>
                        <Divider sx={{ width: '100%', my: 2 }} />
                        <Box sx={{ backgroundColor: 'blanchedalmond', padding: '5px', marginBottom: '15px', borderRadius: '10px', display: 'flex', flexWrap: 'wrap', gap: '10px', minWidth: '50%' }} dir="ltr">
                            {blog?.categories.map((item, index) => (
                                <Button
                                    size='large'
                                    sx={{ color: selectedCategories.includes(item) ? 'red' : 'blue', fontSize: '20px' }}
                                    variant='contained'
                                    key={index}
                                    onClick={() => handleCategoryClick(item)}
                                >
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
