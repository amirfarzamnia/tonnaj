import { Container, Typography, Box, Paper, Grid, Card, CardContent, Button } from '@mui/material';

const PricingCard: React.FC<{ title: string; price: string; features: string[] }> = ({ title, price, features }) => (
    <Card elevation={2} sx={{ borderRadius: 2, mb: 2 }}>
        <CardContent>
            <Typography variant="h6" component="h2" gutterBottom>
                {title}
            </Typography>
            <Typography variant="h4" component="p" gutterBottom>
                {price}
            </Typography>
            <Box component="ul">
                {features.map((feature, index) => (
                    <Typography key={index} variant="body1" component="li" paragraph>
                        {feature}
                    </Typography>
                ))}
            </Box>
            <Button variant="contained" color="primary">
                انتخاب
            </Button>
        </CardContent>
    </Card>
);

export default () => {
    return (
        <Container>
            <Paper elevation={3} sx={{ padding: 4, my: 10, borderRadius: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    تعرفه خدمات
                </Typography>
                <Box mt={2}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        خدمات عمومی تناژ
                    </Typography>
                    <Typography variant="body1" paragraph>
                        ویژه خریداران محصولات کشاورزی
                    </Typography>
                    <Typography variant="body1" paragraph>
                        تناژ ویژگی های متعدی همچون مقایسه قیمت و کیفیت، اعتبارسنجی فروشنده و خریدار، احراز هویت و غیره را در اختیار شما قرار داده است تا از هر گونه سوء استفاده احتمالی جلوگیری کند. بسیاری از این امکانات منحصربفرد بوده و تاکنون در کشور وجود نداشته اند. در ضمن تمامی تامین کنندگان در سامانه تناژ، در حد امکان صحت سنجی شده و اطلاعات آنها توسط کارشناسان مربوطه تکمیل و بازبینی می گردند. تناژ محصول مورد نظر شما را با کمترین واسطه ممکن در دسترس شما جهت انتخاب و معامله قرار می دهد.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        برای استفاده از خدمات عمومی تناژ یکی از گزینه هایی که مناسب کسب و کار شماست را انتخاب کنید:
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <PricingCard title="رایگان" price="0 تومان / در ماه" features={['بررسی قیمت ها', 'ثبت سفارش', 'استعلام قیمت', 'مکالمه با تامین کننده 1 نفر در روز / 3 نفر در ماه', 'درخواست خرید 1 بار در ماه']} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <PricingCard title="خریدار فصلی" price="150,000 تومان / در ماه" features={['بررسی قیمت ها', 'ثبت سفارش', 'استعلام قیمت', 'مکالمه با تامین کننده 2 نفر در روز / 6 نفر در ماه', 'درخواست خرید 1 بار در ماه']} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <PricingCard title="خریدار حرفه ای" price="200,000 تومان / در ماه" features={['بررسی قیمت ها', 'ثبت سفارش', 'استعلام قیمت', 'مکالمه با تامین کننده 3 نفر در روز / 9 نفر در ماه', 'درخواست خرید 3 بار در ماه']} />
                        </Grid>
                    </Grid>
                    <Typography variant="h5" component="h2" gutterBottom mt={4}>
                        خدمات اختصاصی تناژ
                    </Typography>
                    <Typography variant="body1" paragraph>
                        ویژه خریداران حرفه ای
                    </Typography>
                    <Typography variant="body1" paragraph>
                        در حال حاضر عمده فروشی آنلاین به یکی از راه های مقرون به صرفه برای فروش محصولات به حساب می آید چون خرید و فروش عمده محصولات کشاورزی به صورت مستقیم و بدون واسطه باعث می شود هر دو طرف معامله، یعنی فروشنده و خریدار سود بیشتری کسب کنند، در این حالت نیازی به پرداخت هزینه به واسطه های متعدد نیست و شما میتوانید محصول کشاورزی را با قیمت واقعی و مستقیم از فروشنده اصلی خریداری کنید و سود بیشتری به دست آورد.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        برای استفاده از خدمات اختصاصی تناژ یکی از گزینه هایی که مناسب کسب و کار شماست را انتخاب کنید:
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <PricingCard title="محصول یابی" price="100,000 تومان / در ماه" features={['صحت سنجی تامین کننده', 'استعلام موجودی', 'چانه زنی قیمت', 'تنوع محصول در قیمت و مکان حداقل 3 تامین کننده', 'درخواست خرید ویژه 2 بار در ماه']} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <PricingCard title="خدمات معامله" price="1% / از ارزش معامله" features={['عقد قرارداد با کشاورز', 'خدمات پرداخت', 'درخواست خودرو و هماهنگی', 'نظارت بر نحوه بارگیری و ارسال', 'هر محصولی که نیاز به این خدمت دارد را انتخاب کنید و زیر محصول دکمه " ثبت درخواست معامله" را فشار دهید']} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <PricingCard title="خرید از تناژ" price="توافقی / بر اساس معامله" features={['تامین محصول', 'قیمت رقابتی', 'سورت و بسته بندی (در صورت لزوم)', 'تضمین کیفیت', 'مناسب برای صادرکنندگان، کارخانجات و ...']} />
                        </Grid>
                    </Grid>
                    <Typography variant="h5" component="h2" gutterBottom mt={4}>
                        خدمات بازاریابی تناژ
                    </Typography>
                    <Typography variant="body1" paragraph>
                        ویژه کشاورزان
                    </Typography>
                    <Typography variant="body1" paragraph>
                        تناژ به عنوان بستر خرید و فروش محصولات کشاورزی فعالیت دارد، .امکان خرید و فروش بدون واسطه و مستقیم را برای شما فراهم می کند و شما با کمک آن میتوانید سود بیشتری از فروش محصولات کشاورزی خودتان به دست بیاورید. در صورتی که خود شما فروشنده هستید پیشنهاد می کنیم در تناژ ثبت نام کنید و از خدمات متنوع تناژ همچون اطلاع از آخرین درخواست های خرید و ارتباط با هزاران خریدار از سراسر کشور برخوردار شوید.
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <PricingCard title="ثبت محصول" price="0 تومان / در ماه" features={['نمایش در سامانه', 'گفتگو با خریداران', 'پیگیری درخواست سفارش', 'محصول شما در سامانه ثبت شده و روزانه در معرض دید هزاران خریدار قرار میگیرد']} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <PricingCard title="محصول ویژه" price="10,000 تومان / در ماه" features={['نمایش در سامانه', 'گفتگو با خریداران', 'پیگیری درخواست سفارش', 'نمایش با برچسب ویژه']} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <PricingCard title="بازاریابی تخصصی" price="50,000 تومان / در ماه" features={['نمایش در سامانه', 'گفتگو با خریداران', 'پیگیری درخواست سفارش', 'نمایش با برچسب ویژه', 'ارسال پیامک به خریداران']} />
                        </Grid>
                    </Grid>
                    <Typography variant="h5" component="h2" gutterBottom mt={4}>
                        تناژ چگونه کار میکند
                    </Typography>
                    <Typography variant="body1" paragraph>
                        مستقیم از قلب مزرعه
                    </Typography>
                    <Typography variant="h6" component="h3" gutterBottom>
                        ثبت محصول
                    </Typography>
                    <Typography variant="body1" paragraph>
                        کشاورز نوع محصول، میزان و قیمت پیشنهادی خود را همراه با عکس و مشخصات کامل،اعلام و در سامانه ثبت می نماید. محصولات در دسته بندی های تخصصی قابلیت ثبت دارند و پاسخگوی سوالات اولیه خریداران است.
                    </Typography>
                    <Typography variant="h6" component="h3" gutterBottom>
                        بازاریابی و فروش
                    </Typography>
                    <Typography variant="body1" paragraph>
                        مشخصات محصول پس از بررسی توسط کارشناسان تناژ یا نماینده محلی، برای خریداران احتمالی ارسال و مذاکرات بازاریابی توسط تیم تناژ انجام می شود. تلاش تناژ بر ایجاد زبان مشترک میان فروشنده و خریدار و ایجاد یک معامله منصفانه خواهد بود.
                    </Typography>
                    <Typography variant="h6" component="h3" gutterBottom>
                        تحویل
                    </Typography>
                    <Typography variant="body1" paragraph>
                        در صورت درخواست خریدار برای خرید محصول، هماهنگی های لازم برای ارسال و تحویل محصول مطابق با مشخصات اعلام شده، توسط سامانه تناژ انجام شده و مبلغ معامله تسویه و در اختیار کشاورز قرار می گیرد.
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};
