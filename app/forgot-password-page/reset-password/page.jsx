'use client';
import CustomHeader from '@/app/components/ForgotPassword/CustomHeader';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Container } from "@mui/material";
import CustomTextField from '@/app/components/CustomTextField';
import CustomSubmitButton from '@/app/components/CustomSubmitButton';
import CustomSnackbar from '@/app/components/CustomSnackbar';
import { useSnackbarContext } from '@/app/context/SnackbarContext';
import { useEmailContext } from '@/app/context/EmailContext';

const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({ otp: '', newPassword: '', confirmNewPassword: '' });
  const { showSnackbar } = useSnackbarContext();
  const { email, setEmail, isSubmitting, setIsSubmitting, isDisabled, setSetDisabled } = useEmailContext();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true)
    setSetDisabled(true)

    const { otp, newPassword, confirmNewPassword } = formData;

    if (newPassword !== confirmNewPassword) {
      showSnackbar("Passwords do not match.", "warning");
      setIsSubmitting(false)
      setSetDisabled(false)
      return;
    }

    try {
      const response = await fetch('/api/send-email', {  
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp, newPassword, email }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitting(false)
        setSetDisabled(false)
        setEmail('')
        showSnackbar("Password reset successfully.", "success");
        router.push('/')      
      } else {
        showSnackbar(data.message || 'Error resetting password', "warning");
        setIsSubmitting(false)
        setSetDisabled(false)
      }
    } catch (error) {
      showSnackbar("Failed to reset password. Please try again later.", "warning");
      console.error("Error:", error);
      setIsSubmitting(false)
      setSetDisabled(false)
    }
  };

  return (
    <Container component="main" maxWidth="lg" sx={{ mt: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh', position: 'relative', }}>
      <CustomHeader backHref="/forgot-password-page" />
      <CustomSnackbar />
      <Box
        component="form"
        onSubmit={handleSubmit}
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
          label="OTP"
          name="otp"
          value={formData.otp}
          onChange={handleChange}
        />

        <CustomTextField
          label="New Password"
          name="newPassword" 
          type="password" 
          value={formData.newPassword} 
          onChange={handleChange} />
        
        <CustomTextField 
          label="Confirm New Password" 
          name="confirmNewPassword" 
          type="password" 
          value={formData.confirmNewPassword} 
          onChange={handleChange} 
          disabled={isDisabled} />
        
        <CustomSubmitButton 
          type="submit" 
          text={isSubmitting ? "Resetting..." : "Reset Password"}
          color="primary" 
          fullWidth />
      </Box>
    </Container>
  );
};

export default ResetPasswordPage;
