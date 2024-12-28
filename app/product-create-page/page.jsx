'use client';

import React, { useState } from 'react';
import { Grid, Box, Container, Typography, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Sidebar from '@/app/components/Sidebar';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Link from 'next/link';
import { useProductContext } from '@/app/context/ProductsContext';
import { useSupplierContext } from '@/app/context/SuppliersContext';
import CustomTextField from '../components/CustomTextField';
import CustomSubmitButton from '../components/CustomSubmitButton';
import { formControlStyle, selectStyle, menuItemStyle, menuPaperStyle } from '@/app/styles/ProductCreatePageStyles';
import { buttonStyle, sectionTitleStyle } from '@/app/styles/SupplierFormStyles';
import CustomSnackbar from '../components/CustomSnackbar';

export default function ProductCreatePage() {
  const { createProduct } = useProductContext();
  const { suppliersData } = useSupplierContext();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    type: '',
    supplierId: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  
  // Convert price to a number before passing it to createProduct
  const updatedFormData = {
    ...formData,
    price: Number(formData.price), // Convert price to a number
  };

  // Call the createProduct function to handle validation and submission
  await createProduct(updatedFormData);
  setLoading(false);
};


  return (
    <Sidebar>
      <Container component="main" maxWidth="lg">
        <CustomSnackbar />
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button
                variant="text"
                sx={buttonStyle}
                startIcon={<ArrowBackRoundedIcon />}
                component={Link}
                href="/products"
              >
                Back
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Typography sx={{ ...sectionTitleStyle, marginBottom: '0px' }}>General</Typography>
            </Grid>

            <Grid item xs={12}>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2} sx={{ marginBottom: '40px' }}>
                  {[{ label: 'Name', name: 'name', type: 'text' }, { label: 'Price', name: 'price', type: 'number' }, { label: 'Type', name: 'type', type: 'text' }].map(({ label, name, type }) => (
                    <Grid item xs={12} sm={6} key={name}>
                      <CustomTextField
                        label={label}
                        name={name}
                        type={type}
                        value={formData[name]}
                        onChange={handleChange}
                      />
                    </Grid>
                  ))}

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required sx={formControlStyle}>
                      <InputLabel id="supplier-select-label">Supplier</InputLabel>
                      <Select
                        labelId="supplier-select-label"
                        name="supplierId"
                        value={formData.supplierId}
                        onChange={handleChange}
                        sx={selectStyle}
                        MenuProps={{ PaperProps: { sx: menuPaperStyle } }}
                      >
                        {suppliersData.map((supplier) => (
                          <MenuItem key={supplier.id} value={supplier.id} sx={menuItemStyle}>
                            {supplier.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '100px' }}>
                  <CustomSubmitButton loading={loading} onClick={handleSubmit} text="CREATE" disabled={loading} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Sidebar>
  );
}
