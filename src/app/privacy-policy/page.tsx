import { Typography, Box, Paper } from '@mui/material';

export default () => {
    return (
        <Paper elevation={3} sx={{ padding: 4, borderRadius: 4 }}>
            <Typography variant="h4" component="h1">
                حریم خصوصی و امنیت
            </Typography>
            <Box mt={4}>
                <Typography variant="body2" paragraph sx={{ my: 4 }}>
                    ما به حریم خصوصی شما اهمیت می‌دهیم و اطلاعات شخصی شما را با دقت محافظت می‌کنیم. این صفحه به شما توضیح می‌دهد که چگونه اطلاعات شما را جمع‌آوری، استفاده و محافظت می‌کنیم.
                </Typography>
                <Typography variant="h6" component="h2" sx={{ my: 4 }}>
                    جمع‌آوری اطلاعات
                </Typography>
                <Typography variant="body2" paragraph sx={{ my: 4 }}>
                    ما اطلاعاتی از شما جمع‌آوری می‌کنیم که شامل نام، آدرس ایمیل، و شماره تماس می‌شود. همچنین ممکن است اطلاعاتی نظیر آدرس IP، نوع مرورگر، و داده‌های مرتبط با استفاده شما از سایت جمع‌آوری شود.
                </Typography>
                <Typography variant="h6" component="h2" sx={{ my: 4 }}>
                    استفاده از اطلاعات
                </Typography>
                <Typography variant="body2" paragraph sx={{ my: 4 }}>
                    اطلاعات جمع‌آوری شده برای بهبود خدمات ما، تحلیل رفتار کاربران، و ارتباط با شما استفاده می‌شود. ما از این اطلاعات برای شخصی‌سازی تجربه شما و ارائه پیشنهادات متناسب با نیازهای شما استفاده می‌کنیم.
                </Typography>
                <Typography variant="h6" component="h2" sx={{ my: 4 }}>
                    حفاظت از اطلاعات
                </Typography>
                <Typography variant="body2" paragraph sx={{ my: 4 }}>
                    ما تدابیر امنیتی مناسبی برای حفاظت از اطلاعات شما اتخاذ کرده‌ایم. این تدابیر شامل استفاده از رمزنگاری داده‌ها، کنترل دسترسی، و سایر تکنولوژی‌های امنیتی است. ما همچنین اقدامات فیزیکی، الکترونیکی و مدیریتی را برای حفاظت از اطلاعات شما به کار می‌گیریم.
                </Typography>
                <Typography variant="h6" component="h2" sx={{ my: 4 }}>
                    به اشتراک‌گذاری اطلاعات
                </Typography>
                <Typography variant="body2" paragraph sx={{ my: 4 }}>
                    ما اطلاعات شخصی شما را بدون اجازه شما با اشخاص ثالث به اشتراک نمی‌گذاریم، مگر در مواردی که قانوناً موظف به انجام آن باشیم. در صورت نیاز به اشتراک‌گذاری اطلاعات با ارائه‌دهندگان خدمات شخص ثالث، این کار تنها با توافق قبلی شما انجام خواهد شد.
                </Typography>
                <Typography variant="h6" component="h2" sx={{ my: 4 }}>
                    حقوق شما
                </Typography>
                <Typography variant="body2" paragraph sx={{ my: 4 }}>
                    شما حق دارید به اطلاعات شخصی خود دسترسی داشته باشید، آن‌ها را اصلاح کنید یا درخواست حذف آن‌ها را بدهید. برای استفاده از این حقوق، می‌توانید با ما تماس بگیرید.
                </Typography>
                <Typography variant="h6" component="h2" sx={{ my: 4 }}>
                    تماس با ما
                </Typography>
                <Typography variant="body2" paragraph sx={{ my: 4 }}>
                    در صورت داشتن هرگونه سوال یا نگرانی درباره حریم خصوصی و امنیت اطلاعات خود، لطفاً با ما تماس بگیرید. اطلاعات تماس ما در صفحه تماس با ما قابل دسترسی است.
                </Typography>
            </Box>
        </Paper>
    );
};
