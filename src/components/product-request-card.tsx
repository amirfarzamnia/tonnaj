import { Card, CardContent, Typography, Button, Box, Divider, Link } from '@mui/material';
import { ProductRequestTypes } from '@/types/product';
import { ArrowBack } from '@mui/icons-material';
import React from 'react';

import 'swiper/css/pagination';
import 'swiper/css';

export default ({ description, author, categories, location, id }: ProductRequestTypes) => (
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
            <Button endIcon={<ArrowBack />} href={'/products/requests/' + id} variant="outlined" color="secondary" sx={{ 'mt': 2, 'width': '100%', 'py': 2, 'display': 'flex', 'alignItems': 'center', 'gap': 2, 'borderRadius': 1, '&:hover .MuiSvgIcon-root': { transform: 'translateX(-5px)', transition: 'transform 0.3s ease' } }}>
                مشاهده درخواست
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
