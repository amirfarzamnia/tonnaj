import { Card, CardContent, Typography, Button, Box, Divider, Link } from '@mui/material';
import { ArrowBack, DateRange } from '@mui/icons-material';
import { ProductRequestTypes } from '@/types/product';
import React from 'react';

import 'swiper/css/pagination';
import 'swiper/css';

export default function ({ description, author, categories, location, id, timestamp }: ProductRequestTypes) {
    return (
        <Card sx={{ height: '100%', borderRadius: 4 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom textAlign="center" fontSize="medium">
                    {author.name} از {location.city}
                </Typography>
                <Box sx={{ my: 2 }}>
                    <Divider />
                </Box>
                <Typography variant="body1" color="textSecondary" gutterBottom sx={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3, mb: 2, height: '16vh' }}>
                    {description.slice(0, 100)}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom sx={{ fontSize: 'small' }}>
                    <DateRange sx={{ fontSize: 'smaller', ml: 1 }} />
                    در تاریخ {new Intl.DateTimeFormat('fa-IR', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Tehran' }).format(new Date(timestamp)).replace(/(\d{4})\/(\d{2})\/(\d{2})/, '$1/$2/$3')}
                </Typography>
                <Button endIcon={<ArrowBack />} href={'/products/requests/' + id} variant="outlined" color="secondary" sx={{ 'mt': 2, 'width': '100%', 'py': 2, 'display': 'flex', 'alignItems': 'center', 'gap': 2, 'borderRadius': 1, '&:hover .MuiSvgIcon-root': { transform: 'translateX(-5px)', transition: 'transform 0.3s ease' } }}>
                    مشاهده درخواست
                </Button>
                <Box sx={{ my: 2 }}>
                    <Divider />
                </Box>
                <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {categories.map((category) => (
                        <Link key={category} fontSize="smaller" href={'/products/requests?categories=' + category}>
                            {category}
                        </Link>
                    ))}
                </Typography>
            </CardContent>
        </Card>
    );
}
