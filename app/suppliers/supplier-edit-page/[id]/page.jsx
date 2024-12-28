'use client';
import React, { useEffect, useState } from 'react';
import { Grid, Box, Container, Typography, Button } from '@mui/material';
import Sidebar from '@/app/components/Sidebar';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import LoadingIndicator from '@/app/components/LoadingIndicator';
import Link from 'next/link';
import { useSupplierContext } from '@/app/context/SuppliersContext';
import { useParams } from 'next/navigation';
import CustomTextField from '@/app/components/CustomTextField';
import CustomSubmitButton from '@/app/components/CustomSubmitButton';
import { buttonStyle } from '@/app/styles/SupplierFormStyles';
import CustomSnackbar from '@/app/components/CustomSnackbar'
import SupplierDeleteModal from '@/app/components/Suppliers/SupplierDeleteModal'
import { sectionTitleStyle } from '@/app/styles/SectionTitle'

export default function SupplierEditPage() {
  const { id } = useParams();
  const { getSupplierById, updateSupplier, selectSupplier, toggleDeleteModal } = useSupplierContext();

  const [formData, setFormData] = useState({
    name: '',
    tin: '',
    location: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);

  const supplier = getSupplierById(Number(id));

  useEffect(() => {
    if (supplier) {
      setFormData((prev) => ({
        ...prev,
        ...supplier,
      }));
    }
  }, [supplier]);

  const handleChange = ({ target: { name, value } }) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      const updatedSupplier = await updateSupplier(Number(id), formData);
      if (updatedSupplier) {
        console.log('Supplier updated successfully:', updatedSupplier);
      } else {
        console.error('Failed to update supplier');
      }
    } catch (error) {
      console.error('Error saving changes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = () => {
    if (id) {
      selectSupplier(Number(id)); // Set the supplier ID in the context
      toggleDeleteModal(true); // Open the delete modal
    } else {
      console.error('No supplier ID available to delete.');
    }
  };

  if (!supplier) {
    return <LoadingIndicator/>
  }

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
        <CustomSnackbar />
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

            <Grid item xs={12}>
              <Typography sx={sectionTitleStyle} style={{ marginLeft: '-20px'}}>General</Typography>
            </Grid>

            <Box component="form" noValidate sx={{ mt: 3, width: '100%' }}>
              <Grid container spacing={2}>
                {fields.slice(0, 3).map(({ label, name, ...rest }) => (
                  <Grid item xs={12} sm={6} key={name}>
                    <CustomTextField
                      label={label}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      {...rest}
                    />
                  </Grid>
                ))}
              </Grid>

              <Grid item xs={12} sx={{ mt: 3 }}>
                <Typography sx={sectionTitleStyle} style={{marginTop: '40px'}}>Contacts</Typography>
              </Grid>

              <Grid container spacing={2} sx={{ marginBottom: '40px' }}>
                {fields.slice(3).map(({ label, name, ...rest }) => (
                  <Grid item xs={12} sm={6} key={name}>
                    <CustomTextField
                      label={label}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      {...rest}
                    />
                  </Grid>
                ))}
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-start', mb: 6 }}>
                <CustomSubmitButton
                  loading={loading}
                  onClick={handleSaveChanges}
                  text="UPDATE"
                />

                <CustomSubmitButton
                  loading={false} // No loading state for delete button
                  onClick={handleDeleteClick}
                  text="DELETE"
                  type="button" // Prevent form submission
                  backgroundColor="#A5463A"
                />
              </Grid>

              <SupplierDeleteModal/>
            </Box>
          </Grid>
        </Box>
      </Container>
    </Sidebar>
  );
}
