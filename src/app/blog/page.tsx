'use client';

import { Button, Box, Card, CardActions, CardContent, Divider, Grid, Stack, styled, Typography } from '@mui/material';
import blogItems from '@/constants/posts';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const StyledCard = styled(Card)(({ theme }) => ({
    'display': 'flex',
    'flexDirection': 'column',
    'justifyContent': 'space-between',
    'height': '100%',
    'boxShadow': theme.shadows[3],
    'borderRadius': theme.shape.borderRadius * 2,
    'transition': 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: theme.shadows[6]
    }
}));

const StyledButton = styled(Button)(({ theme }) => ({
    'width': '100%',
    'border': '2.5px solid transparent',
    'borderRadius': theme.shape.borderRadius * 2,
    'textTransform': 'uppercase',
    'fontWeight': theme.typography.fontWeightBold,
    'transition': 'all 0.2s ease-in',
    '&:hover': {
        width: '90%',
        borderColor: 'white'
    }
}));

export default () => {

    useEffect(() => {

    }, [])

    const searchParams = useSearchParams()
    const categories = searchParams.get("categories")
    const pathname = usePathname()

    useEffect(() => {
        if (categories) {
            const sendRequest = async () => {
                const url = new URL('/api/products', window.location.origin);
                url.searchParams.append('categories', categories);

                try {
                    const response = await fetch(url.toString());
                    if (response.ok) {
                        const data = await response.json();
                        console.log(data);
                    } else {
                        console.error('Error fetching data:', response.status);
                    }
                } catch (error) {
                    console.error('Fetch error:', error);
                }
            };

            sendRequest();
        }
    }, [categories]);

    useEffect(() => {
        const sendRequest = async () => {
            try {
                const response = await fetch('api/blog');
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                } else {
                    console.error('Error fetching data:', response.status);
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        sendRequest()
    }, [])

    return (
        <Stack maxWidth={'100%'}>
            <Grid container spacing={3} justifyContent="center">
                {blogItems.map((item, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                        <StyledCard>
                            <Box component="img" src={item.image} loading="lazy" height={'30vh'} sx={{ border: "1px solid white", borderRadius: '10px' }} />
                            <CardContent>
                                <Typography variant="h6" sx={{ textAlign: 'center', mb: 1 }}>
                                    {item.name}
                                </Typography>
                                <Divider sx={{ mb: 2 }} />
                                <Typography variant="body2" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', height: 95 }}>
                                    {item.content}
                                </Typography>
                            </CardContent>
                            <Divider />
                            <CardActions sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <StyledButton href={`/blog/${encodeURI(item.name)}`} variant="contained" color="primary">
                                    ادامه
                                </StyledButton>
                            </CardActions>
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
};
