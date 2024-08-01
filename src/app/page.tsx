'use client';

import { Grid, Box, Card, CardContent, Typography, Container, Divider } from '@mui/material';

const cards = [
    { title: 'Card 1', description: 'This is the first card.' },
    { title: 'Card 2', description: 'This is the second card.' },
    { title: 'تحویل', description: 'مشخصات محصول پس از بررسی توسط کارشناسان سروبان یا نماینده محلی، برای خریداران احتمالی ارسال و مذاکرات بازاریابی توسط تیم سروبان انجام می شود. تلاش سروبان بر ایجاد زبان مشترک میان فروشنده و خریدار و ایجاد یک معامله منصفانه خواهد بود' }
];

export default () => {
    return (
        <Container className="mt-10" maxWidth="xl">
            <Typography className="text-teal-400" gutterBottom textAlign="center" variant="h4">
                تناج چگونه کار میکند؟
            </Typography>
            <Typography textAlign="center" variant="subtitle2">
                مستقیم از قلب مردم
            </Typography>
            <Box sx={{ my: 4, width: '25%', mx: 'auto' }}>
                <Divider />
            </Box>
            <Grid container spacing={2}>
                {cards.map((card) => (
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{ background: 'transparent' }}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {card.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {card.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};
