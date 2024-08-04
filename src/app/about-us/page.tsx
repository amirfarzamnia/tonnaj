import { Typography, Box, Paper, Avatar, Grid } from '@mui/material';

export default () => {
    return (
        <>
            <Paper elevation={3} sx={{ padding: 4, my: 10, borderRadius: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    درباره ما
                </Typography>
                <Box mt={2}>
                    <Typography variant="body1" paragraph>
                        ما یک تیم اختصاصی هستیم که به ارائه خدمات با کیفیت بالا و جلب رضایت مشتریان متعهد هستیم. هدف ما ارائه راه‌حل‌های نوآورانه و موثر برای رفع نیازهای شما است.
                    </Typography>
                    <Typography variant="h6" component="h2" gutterBottom>
                        مأموریت ما
                    </Typography>
                    <Typography variant="body1" paragraph>
                        مأموریت ما ارائه خدمات بی‌نظیر به مشتریان، استفاده از تکنولوژی‌های پیشرفته و ایجاد ارزش پایدار برای تمامی ذی‌نفعان است.
                    </Typography>
                    <Typography variant="h6" component="h2" gutterBottom>
                        ارزش‌های ما
                    </Typography>
                    <Typography variant="body1" paragraph>
                        ما به اصول صداقت، مسئولیت‌پذیری، خلاقیت و کیفیت متعهد هستیم. این ارزش‌ها در تمامی فعالیت‌ها و تعاملات ما منعکس می‌شود.
                    </Typography>
                    <Typography variant="h6" component="h2" gutterBottom>
                        تیم ما
                    </Typography>
                    <Grid container spacing={2} mt={2}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Paper elevation={2} sx={{ padding: 2, textAlign: 'center' }}>
                                <Avatar alt="Member 1" src="/path/to/avatar1.jpg" sx={{ width: 80, height: 80, margin: '0 auto' }} />
                                <Typography variant="h6" component="h3" mt={2}>
                                    نام عضو 1
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    مدیرعامل
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Paper elevation={2} sx={{ padding: 2, textAlign: 'center' }}>
                                <Avatar alt="Member 2" src="/path/to/avatar2.jpg" sx={{ width: 80, height: 80, margin: '0 auto' }} />
                                <Typography variant="h6" component="h3" mt={2}>
                                    نام عضو 2
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    مدیر فناوری
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Paper elevation={2} sx={{ padding: 2, textAlign: 'center' }}>
                                <Avatar alt="Member 3" src="/path/to/avatar3.jpg" sx={{ width: 80, height: 80, margin: '0 auto' }} />
                                <Typography variant="h6" component="h3" mt={2}>
                                    نام عضو 3
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    مدیر بازاریابی
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </>
    );
};
