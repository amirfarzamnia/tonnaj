'use client';

import { Box, Button, CardMedia, Container, Divider, Stack, Typography, CircularProgress } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BlogTypes } from '@/types/blog';

export default ({ params }: { params: { name: string } }) => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [blog, setBlog] = useState<BlogTypes | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (!params.name) return;

        (async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch('/api/blog?name=' + pathname.split('/')[2]);

                if (!response.ok) throw new Error('وبلاگ مورد نظر یافت نشد.');

                setBlog(await response.json());
            } catch (e) {
                setError(e instanceof Error ? e.message : 'دریافت اطلاعات از دیتابیس با خطا مواجه شد.');
            } finally {
                setLoading(false);
            }
        })();
    }, [params.name, pathname]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error || !blog) return <Typography variant="h4">{error}</Typography>;

    return (
        <Box>
            <Box component="img" loading="lazy" src={blog.image} />
            <Box component={'div'} sx={{ mb: 2 }}>
                <Typography variant="h4">{blog.name}</Typography>
            </Box>
            <Divider sx={{ width: '100%', my: 2 }} />
            <Box sx={{ minHeight: '50vh' }}>
                <Typography variant="body1">{blog.content}</Typography>
            </Box>
            <Divider sx={{ width: '100%', my: 2 }} />
            <Box sx={{ backgroundColor: 'blanchedalmond', padding: '5px', marginBottom: '15px', borderRadius: '10px', display: 'flex', flexWrap: 'wrap', gap: '10px', minWidth: '50%' }} dir="ltr">
                {blog.categories.map((category, index) => (
                    <Button
                        size="large"
                        sx={{ color: selectedCategories.includes(category) ? 'red' : 'blue', fontSize: '20px' }}
                        variant="contained"
                        key={index}
                        onClick={() => {
                            const updatedCategories = selectedCategories.includes(category) ? selectedCategories.filter((c) => c !== category) : [...selectedCategories, category];

                            setSelectedCategories(updatedCategories);

                            router.push('/blog' + (updatedCategories.length > 0 ? '?categories=' + updatedCategories.join(',') : ''));
                        }}>
                        {category}
                    </Button>
                ))}
            </Box>
        </Box>
    );
};
