'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Box, Container } from "@mui/material";
import CustomTextField from '../components/CustomTextField';
import CustomSubmitButton from '../components/CustomSubmitButton';
import CustomSnackbar from '../components/CustomSnackbar';
import { useSnackbarContext } from '@/app/context/SnackbarContext';
import { useEmailContext } from '@/app/context/EmailContext';
import CustomHeader from '@/app/components/ForgotPassword/CustomHeader';

const ForgotPasswordPage = () => {
    const { email, setEmail, isSubmitting, setIsSubmitting, isDisabled, setSetDisabled } = useEmailContext();
    const { showSnackbar } = useSnackbarContext();
    const router = useRouter();

    const handleChange = (e) => setEmail(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsSubmitting(true)
            setSetDisabled(true)
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                router.push('/forgot-password-page/reset-password');
                showSnackbar("OTP sent successfully to your email!", "success");
                setIsSubmitting(false)
                setSetDisabled(false)
            } else {
                showSnackbar(data.message || 'Something went wrong', "warning");
                setIsSubmitting(false)
                setSetDisabled(false)
                setEmail('')
            }
        } catch (error) {
            showSnackbar("Failed to send OTP. Please try again later.", "warning");
            console.error("Error:", error);
            setIsSubmitting(false)
            setSetDisabled(false)
            setEmail('')
        }
    };

    return (
        <Container
            component="main"
            maxWidth="lg"
            sx={{
                mt: 8,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '50vh',
                position: 'relative',
            }}
        >
            <CustomHeader backHref="/" />

            <CustomSnackbar />
            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    width: '100%',
                    maxWidth: 400,
                    margin: '0 auto',
                    mt: 4,
                }}
            >
                <CustomTextField
                    label="Email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                />
                <CustomSubmitButton
                    type="submit"
                    text={isSubmitting ? "Sending..." : "Send OTP"}   
                    disabled={isDisabled}
                    color="primary"
                    fullWidth
                />
            </Box>
        </Container>
    );
};

export default ForgotPasswordPage;
