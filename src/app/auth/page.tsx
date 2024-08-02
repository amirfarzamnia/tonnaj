'use client';

import { Container, Typography, TextField, Button, Box, Divider, CircularProgress } from '@mui/material';
import React from 'react';

export default () => {
    const [verification_code, setVerificationCode] = React.useState('');
    const [phone_number, setPhoneNumber] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const [step, setStep] = React.useState(1);

    const handlePhoneNumberSubmit = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ phone_number }) });

            if (!response.ok) return setError((await response.json()).error);

            setStep(2);
        } catch {
            setError('ارسال درخواست به سرور با خطا مواجه شد. لطفا بعدا تلاش کنید!');
        } finally {
            setLoading(false);
        }
    };

    const handleVerificationCodeSubmit = async () => {
        setLoading(true);

        try {
            const response = await fetch('/api/auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ verification_code }) });
            const json = await response.json();

            if (json.success) {
                // handle success
            } else {
                setError(json.error || 'Invalid verification code');
            }
        } catch (error) {
            setError('ارسال درخواست به سرور با خطا مواجه شد. لطفا بعدا تلاش کنید!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" textAlign="center" component="h1" gutterBottom>
                    ورود به تناژ
                </Typography>
                <Typography variant="subtitle2" textAlign="center" gutterBottom>
                    برای ورود به تناژ لطفا شماره همراه خود را در قسمت زیر وارد کنید
                </Typography>
                <Box sx={{ my: 4, width: '25%', mx: 'auto' }}>
                    <Divider />
                </Box>
                {step === 1 && (
                    <Box component="form" noValidate autoComplete="off">
                        <TextField fullWidth label="شماره همراه" variant="outlined" margin="normal" value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)} error={!!error} helperText={error} />
                        <Button sx={{ mt: 2, py: 2 }} fullWidth variant="contained" color="primary" onClick={handlePhoneNumberSubmit} disabled={loading}>
                            {loading ? <CircularProgress size={24} /> : 'ادامه و ارسال کد تایید'}
                        </Button>
                    </Box>
                )}
                {step === 2 && (
                    <Box component="form" noValidate autoComplete="off">
                        <TextField fullWidth label="کد تایید" variant="outlined" margin="normal" value={verification_code} onChange={(e) => setVerificationCode(e.target.value)} error={!!error} helperText={error} />
                        <Button fullWidth variant="contained" color="primary" onClick={handleVerificationCodeSubmit} disabled={loading}>
                            {loading ? <CircularProgress size={24} /> : 'تایید کد'}
                        </Button>
                    </Box>
                )}
            </Box>
        </Container>
    );
};
