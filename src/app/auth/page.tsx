'use client';

import { Typography, TextField, Button, Box, Divider, CircularProgress } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthTypes } from '@/types/auth';
import React from 'react';

const VerificationStep: React.FC<{ label: string; value: string; error: string; loading: boolean; buttonText: string; onSubmit: (e: React.FormEvent) => void; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ label, value, error, loading, buttonText, onSubmit, onChange }) => (
    <Box component="form" noValidate autoComplete="off" onSubmit={onSubmit}>
        <TextField fullWidth label={label} variant="outlined" margin="normal" value={value} onChange={onChange} error={!!error} helperText={error} />
        <Button sx={{ mt: 2, py: 2 }} fullWidth variant="contained" color="primary" disabled={loading} type="submit">
            {loading ? <CircularProgress size={24} /> : buttonText}
        </Button>
    </Box>
);

export default function () {
    const [verification_code, setVerificationCode] = React.useState<AuthTypes['verification_code']>('');
    const [phone_number, setPhoneNumber] = React.useState<AuthTypes['phone_number']>('');
    const redirectUrl = useSearchParams().get('redirect') || '/';
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>('');
    const [step, setStep] = React.useState<number>(1);
    const router = useRouter();

    React.useEffect(() => {
        (async () => {
            const { ok } = await fetch('/api/sessions');

            if (ok) router.push(redirectUrl);
        })();
    }, [router, redirectUrl]);

    return (
        <Box sx={{ mx: { lg: 40 }, borderRadius: 1, border: 1, borderColor: 'grey.700', p: 2 }}>
            <Typography variant="h4" textAlign="center" gutterBottom>
                ورود به تناژ
            </Typography>
            <Typography variant="subtitle2" textAlign="center" gutterBottom>
                {step === 1 ? 'برای ورود ابتدا شماره تلفن همراه خود را با اعداد انگلیسی وارد کنید.' : 'کد تایید چهار رقمی پیامک شده به شماره تلفن همراه خود را با اعداد انگلیسی وارد کنید.'}
            </Typography>
            <Box sx={{ my: 4, width: '25%', mx: 'auto' }}>
                <Divider />
            </Box>
            {step === 1 ? (
                <>
                    <VerificationStep
                        label="شماره تلفن همراه خود را اینجا وارد کنید"
                        value={phone_number}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        error={error}
                        loading={loading}
                        buttonText="ادامه و ارسال کد تایید"
                        onSubmit={async (e: React.FormEvent) => {
                            e.preventDefault();

                            if (!/^(09\d{9}|98\d{10})$/.test(phone_number)) return setError('لطفا شماره تلفن همراه خود را به درستی و با اعداد انگلیسی وارد کنید.');

                            setLoading(true);
                            setError('');

                            try {
                                const response = await fetch('/api/sessions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ phone_number }) });

                                if (!response.ok) return setError((await response.json()).error);

                                setStep(2);
                            } catch {
                                setError('ارسال درخواست به سرور با خطا مواجه شد. لطفا بعدا تلاش کنید!');
                            } finally {
                                setLoading(false);
                            }
                        }}
                    />
                </>
            ) : (
                <VerificationStep
                    label="کد تایید"
                    value={verification_code}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    error={error}
                    loading={loading}
                    buttonText="تایید کد"
                    onSubmit={async (e: React.FormEvent) => {
                        e.preventDefault();

                        if (!/^\d{4}$/.test(verification_code)) return setError('لطفا کد تایید چهار رقمی پیامک شده به شماره تلفن همراه خود را به درستی وارد کنید.');

                        setLoading(true);
                        setError('');

                        try {
                            const response = await fetch('/api/sessions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ phone_number, verification_code }) });

                            if (!response.ok) return setError((await response.json()).error);

                            router.push(redirectUrl);
                        } catch {
                            setError('ارسال درخواست به سرور با خطا مواجه شد. لطفا بعدا تلاش کنید!');
                        } finally {
                            setLoading(false);
                        }
                    }}
                />
            )}
        </Box>
    );
}
