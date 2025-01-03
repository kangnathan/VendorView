'use client';
import React, { useState } from 'react';
import { Grid, Box, Container, Typography, Button } from '@mui/material';
import Sidebar from '../components/Sidebar';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Link from 'next/link';
import { useSupplierContext } from '@/app/context/SuppliersContext';
import { useSnackbarContext } from '@/app/context/SnackbarContext';
import CustomTextField from '../components/CustomTextField';
import CustomSubmitButton from '../components/CustomSubmitButton';
import { buttonStyle } from '@/app/styles/SupplierFormStyles';
import CustomSnackbar from '../components/CustomSnackbar';
import { sectionTitleStyle } from '@/app/styles/SectionTitle'

export default function SupplierCreatePage() {
  const { createSupplier } = useSupplierContext();
  const { toggleSnackbar } = useSnackbarContext();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    tin: '',
    location: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) =>
    setFormData((prevData) => ({ ...prevData, [name]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newSupplier = await createSupplier(formData);
    if (newSupplier) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        tin: '',
        location: '',
      });
    } else {
      toggleSnackbar(true);
    }
    setLoading(false);
  };

  const fields = [
    { label: 'Name', name: 'name', type: 'text', required: true, autoFocus: true },
    { label: 'TIN', name: 'tin', type: 'text', required: true },
    { label: 'Location', name: 'location', type: 'text', required: true },
    { label: 'Email', name: 'email', type: 'email', required: true },
    { label: 'Phone No.', name: 'phone', type: 'text', required: true },
  ];

  return (
    <Sidebar>
      <Container component="main" maxWidth="lg">
        <CustomSnackbar/>
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button
                variant="text"
                sx={buttonStyle}
                startIcon={<ArrowBackRoundedIcon />}
                component={Link}
                href="/suppliers"
              >
                Back
              </Button>
            </Grid>

            <Grid item xs={12} >
              <Typography sx={sectionTitleStyle} style={{ marginLeft: '-20px'}}>General</Typography>
            </Grid>

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3, width: '100%' }}>
              <Grid container spacing={2}>
                {fields.slice(0, 3).map(({ label, name, ...rest }) => (
                  <Grid item xs={12} sm={6} key={name}>
                    <CustomTextField
                      label={label}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      
                    />
                  </Grid>
                ))}
              </Grid>

              <Grid item xs={12} sx={{ mt: 6 }}>
                <Typography sx={ sectionTitleStyle }>Contacts</Typography>
              </Grid>

              <Grid container spacing={2} sx={{ marginBottom: '40px' }}>
                {fields.slice(3).map(({ label, name, ...rest }) => (
                  <Grid item xs={12} sm={6} key={name}>
                    <CustomTextField
                      label={label}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                    />
                  </Grid>
                ))}
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-start', mb: 6 }}>
                <CustomSubmitButton loading={loading} onClick={handleSubmit} text="CREATE" />
              </Grid>
            </Box>
          </Grid>
        </Box>
      </Container>
    </Sidebar>
  );
}
