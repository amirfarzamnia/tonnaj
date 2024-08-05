import { Typography, Box, TextField, Button, Paper } from '@mui/material';

export default () => {
    return (
        <>
            <Paper elevation={3} sx={{ padding: 4, borderRadius: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    تماس با ما
                </Typography>
                <Box mt={2}>
                    <Typography variant="body1" paragraph>
                        اگر سوالی دارید یا نیاز به اطلاعات بیشتری دارید، لطفاً از طریق فرم زیر با ما در تماس باشید. همچنین می‌توانید از اطلاعات تماس زیر برای ارتباط مستقیم با ما استفاده کنید.
                    </Typography>
                    <Typography variant="h6" component="h2" gutterBottom>
                        اطلاعات تماس
                    </Typography>
                    <Typography variant="body1" paragraph>
                        ایمیل: info@example.com
                    </Typography>
                    <Typography variant="body1" paragraph>
                        شماره تماس: 123-456-7890
                    </Typography>
                    <Typography variant="body1" paragraph>
                        آدرس: خیابان مثال، پلاک 123، شهر مثال، کشور مثال
                    </Typography>
                    <Typography variant="h6" component="h2" gutterBottom>
                        فرم تماس
                    </Typography>
                    <Box component="form" noValidate autoComplete="off">
                        <TextField fullWidth label="نام" variant="outlined" margin="normal" />
                        <TextField fullWidth label="ایمیل" variant="outlined" margin="normal" />
                        <TextField fullWidth label="پیام" variant="outlined" margin="normal" multiline rows={4} />
                        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                            ارسال
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </>
    );
};
