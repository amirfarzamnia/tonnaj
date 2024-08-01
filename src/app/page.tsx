'use client';

import { Grid, Box, Button, Card, CardContent, Typography, Container, Divider } from '@mui/material';
import { Inventory2, Sell, LocalShipping } from '@mui/icons-material';

const cards = [
    { title: 'ثبت محصول', icon: Inventory2, description: 'کشاورز یا تامین کننده نوع محصول، میزان و قیمت پیشنهادی خود را همراه با عکس و مشخصات کامل،اعلام و در سامانه ثبت می نماید. محصولات در دسته بندی های تخصصی قابلیت ثبت دارند و پاسخگوی سوالات اولیه خریداران است.' },
    { title: 'بازاریابی و فروش', icon: Sell, description: 'مشخصات محصول پس از بررسی توسط کارشناسان سروبان یا نماینده محلی، برای خریداران احتمالی ارسال و مذاکرات بازاریابی توسط تیم سروبان انجام می شود. تلاش سروبان بر ایجاد زبان مشترک میان فروشنده و خریدار و ایجاد یک معامله منصفانه خواهد بود' },
    { title: 'تحویل', icon: LocalShipping, description: 'مشخصات محصول پس از بررسی توسط کارشناسان سروبان یا نماینده محلی، برای خریداران احتمالی ارسال و مذاکرات بازاریابی توسط تیم سروبان انجام می شود. تلاش سروبان بر ایجاد زبان مشترک میان فروشنده و خریدار و ایجاد یک معامله منصفانه خواهد بود' }
];

export default () => {
    return (
        <Container className="mt-10" maxWidth="xl">
            <Typography gutterBottom textAlign="center" variant="h4">
                تناژ چگونه کار میکند؟
            </Typography>
            <Typography textAlign="center" variant="subtitle2">
                مستقیم از قلب مردم
            </Typography>
            <Box sx={{ my: 4, width: '25%', mx: 'auto' }}>
                <Divider />
            </Box>
            <Grid container spacing={2}>
                {cards.map((card, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ background: 'transparent' }}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    <card.icon sx={{ ml: 2 }} />
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
            <iframe className="mx-auto my-12" src="https://www.aparat.com/video/video/embed/videohash/jicqws8/vt/frame" allowFullScreen></iframe>
            <Box className="mx-auto mt-4 mb-20 w-full flex items-center justify-center">
                <Button variant="outlined" color="secondary" href="/market-guid">
                    درباره خدمات خرید و فروش عمده تناژ بیشتر بدانید
                </Button>
            </Box>
        </Container>
    );
};
