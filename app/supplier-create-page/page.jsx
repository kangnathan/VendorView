'use client'
import React, { useState } from 'react';
import { Grid, Box, Container, Button, Typography, TextField } from '@mui/material';
import Sidebar from '../components/Sidebar';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { textFieldStyle, buttonStyle, sectionTitleStyle } from '@/app/styles/SupplierFormStyles';
import Link from 'next/link';
import { useSupplierContext } from '@/app/context/SuppliersContext'; // Import SupplierContext

export default function SupplierCreatePage() {
  const { createSupplier } = useSupplierContext(); // Access createSupplier from the context

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    tin: '',
    location: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newSupplier = await createSupplier(formData);
    if (newSupplier) {
      // Successfully created supplier, you can redirect or show a success message
      console.log('Supplier created successfully:', newSupplier);
    } else {
      // Handle error if supplier creation fails
      console.error('Failed to create supplier');
    }
  };

  return (
    <Sidebar>
      <Container component="main" maxWidth="lg">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
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

                  <Grid item xs={12}>
                    <Typography sx={sectionTitleStyle}>General</Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          autoComplete="name"
                          name="name"
                          variant="outlined"
                          required
                          fullWidth
                          id="name"
                          label="Name"
                          value={formData.name}
                          onChange={handleChange}
                          autoFocus
                          sx={textFieldStyle}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          variant="outlined"
                          fullWidth
                          id="tin"
                          label="TIN"
                          name="tin"
                          value={formData.tin}
                          onChange={handleChange}
                          sx={textFieldStyle}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="location"
                          label="Location"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          autoComplete="location"
                          sx={textFieldStyle}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography sx={{ ...sectionTitleStyle, marginBottom: '0px' }}>Contacts</Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container spacing={2} sx={{ marginBottom: '40px' }}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          autoComplete="email"
                          name="email"
                          variant="outlined"
                          required
                          fullWidth
                          id="email"
                          label="Email"
                          value={formData.email}
                          onChange={handleChange}
                          sx={textFieldStyle}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}></Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          autoComplete="phone"
                          name="phone"
                          variant="outlined"
                          required
                          fullWidth
                          id="phone"
                          label="Phone No."
                          value={formData.phone}
                          onChange={handleChange}
                          sx={textFieldStyle}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} sx={{ marginBottom: '100px' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Box>
                      <Button
                        type="submit" // Trigger form submission
                        variant="contained"
                        sx={{
                          marginTop: '5px',
                          padding: '10px 25px 10px 25px',
                          borderRadius: '10px',
                          backgroundColor: '#A35422',
                          fontFamily: 'poppins',
                          fontWeight: 500,
                          marginRight: '20px',
                        }}
                      >
                        CREATE
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Sidebar>
  );
}
