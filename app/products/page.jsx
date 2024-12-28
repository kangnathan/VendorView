'use client'
import React from 'react';
import { Container, Typography, Grid, Button, Box } from '@mui/material';
import Sidebar from '../components/Sidebar';
import ProductsSearch from '../components/Products/ProductsSearch';
import ProductsDataGrid from '../components/Products/ProductsDataGrid';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ProductDeleteModal from '../components/Products/ProductDeleteModal';
import CustomSnackbar from '@/app/components/CustomSnackbar'
import CustomSubmitButton from '../components/CustomSubmitButton';
import { sectionTitleStyle } from '@/app/styles/SectionTitle'
import { useProductContext } from '../context/ProductsContext';
import ProductFilterModal from '../components/Products/ProductFilterModal';

export default function Products() {
    const { handleOpen } = useProductContext()

    const handleAddButtonClick = () => {
        window.open('/product-create-page', '_blank'); // Open in a new tab
    };

    return (
        <Sidebar>
            <Container component="main" maxWidth="lg" sx={{ marginTop: 8 }}>
                <CustomSnackbar />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Grid container spacing={2}>
                        {/* Title */}
                        <Grid item xs={12}>
                            <Typography sx={sectionTitleStyle}>Products</Typography>
                        </Grid>

                        <ProductDeleteModal />
                        <ProductFilterModal />

                        {/* Left side: ProductsSearch and ProductsFilter */}
                        <Grid item xs={12} sm={6} md={8} sx={{ display: 'flex', gap: 2 }}>
                            <ProductsSearch />
                            <CustomSubmitButton onClick={handleOpen} text='Filter'/>
                        </Grid>

                        {/* Right side: ProductAdd Button */}
                        <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <CustomSubmitButton onClick={handleAddButtonClick} text='add' startIcon={<AddRoundedIcon />} style={{marginRight: '0px'}} />
                        </Grid>
                    </Grid>

                    {/* Data Grid Section */}
                    <Grid container sx={{ marginTop: '40px' }}>
                        <ProductsDataGrid />
                    </Grid>
                </Box>
                
            </Container>
        </Sidebar>
    );
}
