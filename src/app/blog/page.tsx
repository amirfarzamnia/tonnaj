'use client'

import { useBlog } from '@/contexts/blog';
import { Button, Card, CardActions, CardContent, CardMedia, CardMediaProps, Container, Divider, Grid, Stack, styled, Typography } from '@mui/material';



const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    boxShadow: theme.shadows[3],
    borderRadius: theme.shape.borderRadius * 2,
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: theme.shadows[6],
    },
}));

const StyledCardMedia = styled(CardMedia)<CardMediaProps>(({ theme }) => ({
    height: 200,
    objectFit: 'cover',
    borderTopLeftRadius: theme.shape.borderRadius * 2,
    borderTopRightRadius: theme.shape.borderRadius * 2,
}));

const StyledButton = styled(Button)(({ theme }) => ({
    width: '100%',
    borderRadius: theme.shape.borderRadius * 2,
    textTransform: 'uppercase',
    fontWeight: theme.typography.fontWeightBold,
}));

export default () => {
    const { blogItems } = useBlog()

    return (
        <Stack maxWidth={'100%'} >


            <Grid container spacing={3} justifyContent="center">
                {blogItems.map((item, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                        <StyledCard>
                            <StyledCardMedia
                                component="img"
                                image={item.image}
                            />
                            <CardContent>
                                <Typography variant='h6' sx={{ textAlign: 'center', mb: 1 }}>
                                    {item.title}
                                </Typography>
                                <Divider sx={{ mb: 2 }} />
                                <Typography variant="body2" color="text.secondary" sx={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    display: "-webkit-box",
                                    WebkitLineClamp: 4,
                                    WebkitBoxOrient: "vertical",
                                    height: 95,
                                }}>
                                    {item.description}
                                </Typography>
                            </CardContent>
                            <Divider />
                            <CardActions sx={{ p: 2 }}>
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
