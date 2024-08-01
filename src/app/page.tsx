'use client';

import { Grid, Card, CardContent, Typography, Container } from '@mui/material';

const cards = [
    { title: 'Card 1', description: 'This is the first card.' },
    { title: 'Card 2', description: 'This is the second card.' },
    { title: 'Card 3', description: 'مشخصات محصول پس از بررسی توسط کارشناسان سروبان یا نماینده محلی، برای خریداران احتمالی ارسال و مذاکرات بازاریابی توسط تیم سروبان انجام می شود. تلاش سروبان بر ایجاد زبان مشترک میان فروشنده و خریدار و ایجاد یک معامله منصفانه خواهد بود' }
];

export default () => {
    return (
        <Container maxWidth="xl">
            <Grid container spacing={2}>
                {cards.map((card) => (
                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
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
