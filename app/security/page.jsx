'use client'
import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material'
import { useRouter } from 'next/navigation'
import Sidebar from '../components/Sidebar'
import CustomTextField from '../components/CustomTextField'
import CustomSubmitButton from '../components/CustomSubmitButton'
import CustomSnackbar from '../components/CustomSnackbar'
import { useSnackbarContext } from '../context/SnackbarContext'
import { handlePasswordUpdate } from '@/app/utils/handlePasswordUpdate'

export default function HomePage() {
  const router = useRouter();
  const { showSnackbar } = useSnackbarContext();

  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  })

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = () => {
    handlePasswordUpdate(formData, showSnackbar, router);
  }

  return (
    <Sidebar>
      <Container component="main" maxWidth="lg" sx={{ mt: 8 }}>
        <CustomSnackbar />

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography
            sx={{
              fontFamily: 'Poppins',
              fontWeight: 600,
              fontSize: 30,
              mb: 3,
            }}
          >
            Security
          </Typography>

          {[
            { label: 'Old Password', name: 'oldPassword', type: 'text' },
            { label: 'New Password', name: 'newPassword', type: 'password' },
            { label: 'Confirm New Password', name: 'confirmNewPassword', type: 'password' },
          ].map(({ label, name, type }, idx) => (
            <CustomTextField
              key={name}
              label={label}
              name={name}
              type={type}
              style={{ marginBottom: idx === 2 ? '30px' : '15px' }}
              onChange={handleChange}
              value={formData[name]}
            />
          ))}

          <Typography
            sx={{
              fontFamily: 'Poppins',
              fontWeight: 400,
              fontSize: 16,
              mb: 2,
              ml: 1,
              color: '#757575',
            }}
          >
            Note: You will be logged out after changing
          </Typography>

          <CustomSubmitButton text="Change Password" onClick={handleSubmit} />
        </Box>
      </Container>
    </Sidebar>
  )
}
