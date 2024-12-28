'use client';
import React from 'react';
import { Container, Typography, Grid, Button, Box } from '@mui/material';
import Sidebar from '@/app/components/Sidebar';
import SupplierFilterModal from '@/app/components/Suppliers/SupplierFilterModal';
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useParams } from 'next/navigation';
import { useSupplierContext } from '@/app/context/SuppliersContext';
import SuppliersProducts from '@/app/components/Suppliers/SuppliersProducts';
import { useRouter } from 'next/navigation';
import LoadingIndicator from '@/app/components/LoadingIndicator';
import ProductsSearch from '@/app/components/Products/ProductsSearch';
import { buttonStyle } from '@/app/styles/SupplierFormStyles';
import ProductDeleteModal from '@/app/components/Products/ProductDeleteModal';
import { sectionTitleStyle } from '@/app/styles/SectionTitle';
import CustomSubmitButton from '@/app/components/CustomSubmitButton';
import CustomFilterModal from '@/app/components/CustomFilterModal';
import { useProductContext} from '@/app/context/ProductsContext'


export default function Suppliers() {
  const router = useRouter();
  const { id } = useParams();
  const { suppliersData } = useSupplierContext();
  const { handleOpen } = useProductContext()

  const supplier = suppliersData.find((supplier) => supplier.id === Number(id));

  const handleAddButtonClick = () => {
    router.push('/product-create-page'); // Direct navigation
  };

  if (!supplier) {
    return <LoadingIndicator/>
  }

  return (
    <Sidebar>
      <Container component="main" maxWidth="lg" sx={{ marginTop: 8 }}>
        {/* Back Button */}
        <Button
          variant="text"
          sx={{ ...buttonStyle, mb: 2 }}
          startIcon={<ArrowBackRoundedIcon />}
          onClick={() => router.push('/suppliers')}
        >
          Back
        </Button>

        {/* Page Title */}
        <Typography sx={sectionTitleStyle}>{supplier.name}</Typography>

        {/* Filter and Search Section */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={8} sx={{ display: 'flex', gap: 2 }}>
            <ProductsSearch />
            <CustomSubmitButton  onClick={handleOpen} text='Filter'/>
            <CustomFilterModal />
          </Grid>
          <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <CustomSubmitButton startIcon={<AddRoundedIcon />} onClick={handleAddButtonClick} text="add" />
          </Grid>
        </Grid>

        {/* Products Grid */}
        <Grid container sx={{ marginTop: '40px' }}>
          <SuppliersProducts />
        </Grid>

        <ProductDeleteModal />
      </Container>
    </Sidebar>
  );
}
