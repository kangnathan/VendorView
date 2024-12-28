'use client'
import React from 'react';
import { 
    Container, 
    Typography, 
    Grid, 
    
    Box 
} from '@mui/material';
import Sidebar from '../components/Sidebar';
import SupplierSearch from '../components/Suppliers/SupplierSearch';
import SupplierDataGrid from '../components/Suppliers/SupplierDataGrid';
import AddBusinessRoundedIcon from '@mui/icons-material/AddBusinessRounded';
import SupplierDeleteModal from '../components/Suppliers/SupplierDeleteModal';
import CustomSnackbar from '../components/CustomSnackbar';
import CustomSubmitButton from '../components/CustomSubmitButton';
import SupplierFilterModal from '../components/Suppliers/SupplierFilterModal';
import { sectionTitleStyle } from '@/app/styles/SectionTitle'
import { useSupplierContext } from '@/app/context/SuppliersContext'

export default function Suppliers() {
    
    const { handleOpen } = useSupplierContext()

    const handleAddButtonClick = () => {
        window.open('/supplier-create-page', '_blank'); // Open in a new tab
    };


    return (
        <Sidebar>
            <Container component="main" maxWidth="lg" sx={{ marginTop: 8 }}>
                <CustomSnackbar />
                <SupplierFilterModal />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Grid container spacing={2}>
                        {/* Title */}
                        <Grid item xs={12}>
                            <Typography sx={sectionTitleStyle}>Suppliers</Typography>
                        </Grid>

                        <SupplierDeleteModal />

                        {/* Left side: SupplierSearch and SupplierFilter */}
                        <Grid item xs={12} sm={6} md={8} sx={{ display: 'flex', gap: 2 }}>
                            <SupplierSearch />
                            <CustomSubmitButton onClick={handleOpen} text='Filter'/>
                        </Grid>

                        {/* Right side: SupplierAdd Button */}
                        <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <CustomSubmitButton onClick={handleAddButtonClick} text='add' startIcon={<AddBusinessRoundedIcon />} style={{marginRight: '0px'}}/>
                        </Grid>
                    </Grid>

                    {/* Data Grid Section */}
                    <Grid container sx={{ marginTop: '40px' }}>
                        <SupplierDataGrid />
                    </Grid>
                </Box>
            </Container>
        </Sidebar>
    );
}
