import { Typography, Box, Divider, Card } from '@mui/material';

export default () => {
    return (
        <Card elevation={3} sx={{ padding: 4, mx: 50, my: 10, borderRadius: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom textAlign="center">
                تماس با ما
            </Typography>
            <Box mt={2}>
                <Typography variant="body1" paragraph textAlign="center">
                    برای تماس با تیم تناژ میتوانید از اطلاعات زیر استفاده کنید.
                </Typography>
                <Divider sx={{ my: 4 }} />
                <Typography variant="h6" component="h2" gutterBottom sx={{ mb: 4 }}>
                    اطلاعات تماس
                </Typography>
                <Typography variant="body1" paragraph>
                    ایمیل: info@tonnaj.com
                </Typography>
                <Typography variant="body1" paragraph>
                    شماره تماس: 02122924090
                </Typography>
                <Typography variant="body1" paragraph>
                    آدرس: تهران، اقدسیه، خیابان ارتش، پلاک ۱۱۳
                </Typography>
            </Box>
        </Card>
    );
};
