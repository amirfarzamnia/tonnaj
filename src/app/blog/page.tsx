'use client';

import { Button, Box, Card, CardActions, CardContent, Divider, Grid, Stack, styled, Typography } from '@mui/material';
import blogItems from '@/constants/posts';

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
    return (
        <Stack maxWidth={'100%'}>
            <Grid container spacing={3} justifyContent="center">
                {blogItems.map((item, index) => (
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
                ))}
            </Grid>
        </Stack>
    );
};
