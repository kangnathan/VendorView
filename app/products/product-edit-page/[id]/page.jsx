'use client';
import { useParams } from 'next/navigation';
import { useProductContext } from '@/app/context/ProductsContext';
import { Grid, Box, Container, Typography,Button } from '@mui/material';
import Sidebar from '@/app/components/Sidebar';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Link from 'next/link';
import CustomTextField from '@/app/components/CustomTextField';
import CustomSubmitButton from '@/app/components/CustomSubmitButton';
import { useState, useEffect } from 'react';
import { buttonStyle, sectionTitleStyle } from '@/app/styles/SupplierFormStyles';
import ProductDeleteModal from '@/app/components/Products/ProductDeleteModal';
import CustomSnackbar from '@/app/components/CustomSnackbar'

const EditProductPage = () => {
  const { id } = useParams();
  const { getProductById, updateProduct, toggleDeleteModal, selectProduct } = useProductContext();
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    type: '',
    supplier: '',
  });
  const [loading, setLoading] = useState(false);

  const product = getProductById(Number(id));

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        price: product.price || '',
        type: product.type || '',
        supplier: product.supplier?.name || '',
      });
    }
  }, [product]);

  const handleDeleteClick = () => {
    if (id) {
      selectProduct(Number(id)); 
      toggleDeleteModal(true); 
    } else {
      console.error("No product ID available to delete.");
    }
  };

  const handleChange = ({ target: { name, value } }) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  const handleSaveChanges = async () => {
    if (!product) return;

    setLoading(true);
    try {
      const updatedProduct = await updateProduct(Number(id), {
        ...formData,
        price: parseFloat(formData.price),
      });
      if (updatedProduct) {
        console.log('Product updated successfully:', updatedProduct);
      } else {
        console.error('Failed to update product');
      }
    } catch (error) {
      console.error('Error saving changes:', error);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { label: 'Name', name: 'name', type: 'text', required: true },
    { label: 'Price', name: 'price', type: 'number', required: true },
    { label: 'Type', name: 'type', type: 'text', required: true },
    { label: 'Supplier', name: 'supplier', type: 'text', required: true, disabled: true },
  ];

  return (
    <Sidebar>
      <Container component="main" maxWidth="lg">
        <CustomSnackbar />
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
              <Typography sx={sectionTitleStyle}>General</Typography>
            </Grid>

            <Grid item xs={12}>
              <Box component="form" noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  {fields.map(({ label, name, ...rest }) => (
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
              </Box>
            </Grid>

            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-start', marginTop: '40px' }}>
              <CustomSubmitButton loading={loading} onClick={handleSaveChanges} text="Update" />
              <CustomSubmitButton loading={loading} onClick={handleDeleteClick} text="Delete" backgroundColor="#A5463A"/>
              <ProductDeleteModal/>
            </Grid>
          </Grid>
        </Box>
        
      </Container>
    </Sidebar>
  );
};

export default EditProductPage;
