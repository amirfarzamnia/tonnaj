'use client';

import { Grid, Typography, Button, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useShop } from '@/contexts/shop';
import React from 'react';

export default () => {
    const { products } = useShop();
    const router = useRouter();

    return (
        <>
            <Box sx={{ marginBottom: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Product Categories
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {Array.from(new Set(products.flatMap(({ categories }) => categories))).map((category) => (
                        <Button key={category} variant="outlined" onClick={() => router.push(`/categories/${category}`)}>
                            {category}
                        </Button>
                    ))}
                </Box>
            </Box>
            <Typography variant="h4" gutterBottom>
                Products
            </Typography>
            <Grid container spacing={3}>
                {products.map(({ price, description, images, title, id }) => (
                    <Grid item xs={12} sm={6} md={4} key={id}>
                        <Box sx={{ border: '1px solid #ddd', borderRadius: 2, padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img src={images[0]} alt={title} style={{ width: '100%', height: 'auto', borderRadius: 4 }} />
                            <Typography variant="h6" gutterBottom>
                                {title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {description}
                            </Typography>
                            <Typography variant="h6" color="primary" gutterBottom>
                                {price}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};
