import { Typography, IconButton, Button, Container, Box, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default () => {
    return (
        <Container sx={{ mt: 4 }}>
            <Box display="flex" justifyContent="center" alignItems="center">
                <TextField variant="outlined" placeholder="جستجوی محصول..." fullWidth />
                <IconButton color="primary">
                    <SearchIcon />
                </IconButton>
            </Box>
            <Box textAlign="center" mt={4}>
                <Button variant="contained" color="success" sx={{ mx: 2 }}>
                    ثبت محصول
                </Button>
                <Button variant="contained" color="success" sx={{ mx: 2 }}>
                    ثبت تقاضای خرید
                </Button>
            </Box>
            <Typography variant="h4" textAlign="center" mt={4}>
                نرخنامه میوه و تره بار
            </Typography>
            <Box textAlign="center" mt={2}>
                <Button variant="outlined" sx={{ mx: 1 }}>
                    همه
                </Button>
                <Button variant="outlined" sx={{ mx: 1 }}>
                    میوه‌ها
                </Button>
                <Button variant="outlined" sx={{ mx: 1 }}>
                    سبزیجات
                </Button>
                <Button variant="outlined" sx={{ mx: 1 }}>
                    صیفی‌جات
                </Button>
            </Box>
            <Box mt={4}>
                <Typography variant="body1" textAlign="center" bgcolor="#e0f7fa" p={2}>
                    برای مشاهده نرخنامه به روز، روی دکمه زیر کلیک کنید.
                </Typography>
                <Button variant="contained" color="success" fullWidth>
                    مشاهده نرخنامه
                </Button>
            </Box>
        </Container>
    );
};
