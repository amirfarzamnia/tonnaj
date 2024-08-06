'use client';

import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Divider, Grid, Stack, styled, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import blogItems from '@/constants/posts';
import { BlogTypes } from '@/types/blog';

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

export default ({ params }: { params: { name: string } }) => {
    const [categoriesItems, setCategoriesItems] = useState<BlogTypes[]>();
    const [error, setError] = useState(false);

    useEffect(() => {
        if (params.name) {
            const param = decodeURI(params.name);

            const findCategories = blogItems.filter((item) => item.categories.includes(param));

            findCategories.length >= 1 ? setCategoriesItems(findCategories) : setError(true);
        }
    }, []);

    return (
        <Stack maxWidth={'100%'}>
            {error ? (
                <Container component={'div'} maxWidth={'xl'} sx={{ display: 'flex', justifyItems: 'center', alignItems: 'center', maxHeight: '50vh' }}>
                    <Typography variant="h4">چیزی یافت نشد</Typography>
                </Container>
            ) : (
                <Grid container spacing={2} maxWidth={'100%'} sx={{ padding: 4, placeContent: 'end' }}>
                    {categoriesItems?.map((item, index) => {
                        return (
                            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                                <StyledCard>
                                    <Box component="img" src={item.image} loading="lazy" height={'30vh'} sx={{ border: "1px solid white", borderRadius: '10px' }} />
                                    <CardContent>
                                        <Typography variant="h6" sx={{ textAlign: 'center', mb: 1 }}>
                                            {item.title}
                                        </Typography>
                                        <Divider sx={{ mb: 2 }} />
                                        <Typography variant="body2" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', height: 95 }}>
                                            {item.description}
                                        </Typography>
                                    </CardContent>
                                    <Divider />
                                    <CardActions sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <StyledButton href={`/blog/${item.id}`} variant="contained" color="primary">
                                            ادامه
                                        </StyledButton>
                                    </CardActions>
                                </StyledCard>
                            </Grid>
                        );
                    })}
                </Grid>
            )}
        </Stack>
    );
};
