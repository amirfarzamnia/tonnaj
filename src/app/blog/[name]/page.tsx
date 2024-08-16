'use client';

import { Box, Button, Typography, CircularProgress, Card } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BlogTypes } from '@/types/blog';

export default function ({ params }: { params: { name: string } }) {
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
        <Box sx={{ px: { lg: 10 } }}>
            <Box textAlign="center">
                <Box component="img" loading="lazy" src={'/images/posts/' + blog.name + '.png'} width="25%" sx={{ borderRadius: 4, border: 1, mb: 4, borderColor: 'grey.600', width: { xs: '100%', lg: '25%' } }} />
                <Typography variant="h4">{blog.name}</Typography>
            </Box>
            <Card sx={{ p: 4, borderRadius: 4, my: 4 }}>
                <Typography sx={{ my: 6 }} variant="body1">
                    {blog.content}
                </Typography>
            </Card>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {blog.categories.map((category) => (
                    <Button
                        variant="outlined"
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
}
