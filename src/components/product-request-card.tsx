import { Card, CardContent, Typography, Button, Box, Divider, Link } from '@mui/material';
import { ProductRequestTypes } from '@/types/product';
import { Phone } from '@mui/icons-material';
import React from 'react';

import 'swiper/css/pagination';
import 'swiper/css';

export default ({ description, author, categories, location }: ProductRequestTypes) => (
    <Card sx={{ width: 345, height: '100%', borderRadius: 4, display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom textAlign="center" fontSize="medium">
                {author.name} از {location.city}
            </Typography>
            <Box sx={{ my: 2 }}>
                <Divider />
            </Box>
            <Typography variant="body1" color="textSecondary" gutterBottom sx={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3 }}>
                {description.slice(0, 100)}
            </Typography>
            <Button endIcon={<Phone />} href={'tel:' + author.phone_number} variant="outlined" color="secondary" sx={{ mt: 2, width: '100%', py: 2, display: 'flex', alignItems: 'center', gap: 2, borderRadius: 1 }}>
                تماس با خریدار
            </Button>
            <Box sx={{ my: 2 }}>
                <Divider />
            </Box>
            <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {categories.map((category) => (
                    <Link key={category} fontSize="smaller" href={'?categories=' + category}>
                        {category}
                    </Link>
                ))}
            </Typography>
        </CardContent>
    </Card>
);
