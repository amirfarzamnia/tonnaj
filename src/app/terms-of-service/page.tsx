import { Container, Typography, Box, Paper } from '@mui/material';

export default () => {
    return (
        <Container>
            <Paper elevation={3} sx={{ padding: 4, my: 10, borderRadius: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    قوانین استفاده از سرویس
                </Typography>
                <Box mt={2}>
                    <Typography variant="body1" paragraph>
                        با استفاده از خدمات ما، شما موافقت خود را با قوانین و مقررات زیر اعلام می‌کنید. لطفاً این قوانین را با دقت مطالعه کنید.
                    </Typography>
                    <Typography variant="h6" component="h2" gutterBottom>
                        ۱. قبول قوانین
                    </Typography>
                    <Typography variant="body1" paragraph>
                        با دسترسی و استفاده از این سرویس، شما موافقت خود را با تمامی قوانین و مقررات این صفحه اعلام می‌کنید. اگر با هر یک از این قوانین مخالف هستید، لطفاً از سرویس ما استفاده نکنید.
                    </Typography>
                    <Typography variant="h6" component="h2" gutterBottom>
                        ۲. تغییرات در قوانین
                    </Typography>
                    <Typography variant="body1" paragraph>
                        ما حق داریم در هر زمان و بدون اطلاع قبلی، این قوانین را تغییر دهیم. شما مسئول هستید که به صورت دوره‌ای این صفحه را مرور کنید تا از تغییرات احتمالی مطلع شوید.
                    </Typography>
                    <Typography variant="h6" component="h2" gutterBottom>
                        ۳. استفاده مجاز
                    </Typography>
                    <Typography variant="body1" paragraph>
                        شما موافقت می‌کنید که از سرویس فقط برای مقاصد قانونی و مطابق با قوانین محلی، ملی و بین‌المللی استفاده کنید. استفاده از سرویس برای فعالیت‌های غیرقانونی، آسیب‌زننده، یا مخرب ممنوع است.
                    </Typography>
                    <Typography variant="h6" component="h2" gutterBottom>
                        ۴. مالکیت محتوا
                    </Typography>
                    <Typography variant="body1" paragraph>
                        تمامی محتوای موجود در سرویس، شامل متن‌ها، تصاویر، لوگوها و نرم‌افزارها، متعلق به ما یا صاحبان مجوزهای مربوطه است و شما حق ندارید بدون اجازه صریح از آن‌ها استفاده کنید.
                    </Typography>
                    <Typography variant="h6" component="h2" gutterBottom>
                        ۵. محدودیت‌های مسئولیت
                    </Typography>
                    <Typography variant="body1" paragraph>
                        ما مسئولیتی در قبال خسارات مستقیم یا غیرمستقیمی که از استفاده یا عدم توانایی استفاده از سرویس ناشی می‌شود، نداریم. استفاده از سرویس به عهده خود شماست.
                    </Typography>
                    <Typography variant="h6" component="h2" gutterBottom>
                        ۶. حریم خصوصی
                    </Typography>
                    <Typography variant="body1" paragraph>
                        استفاده از سرویس ما مشمول سیاست‌های حریم خصوصی ما است که جداگانه ارائه شده است. لطفاً سیاست‌های حریم خصوصی ما را برای اطلاعات بیشتر مطالعه کنید.
                    </Typography>
                    <Typography variant="h6" component="h2" gutterBottom>
                        ۷. تماس با ما
                    </Typography>
                    <Typography variant="body1" paragraph>
                        اگر سوال یا نگرانی درباره این قوانین دارید، لطفاً با ما تماس بگیرید. اطلاعات تماس ما در بخش پایین سایت قابل دسترسی است.
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};
