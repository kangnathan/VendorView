import React from 'react';
import { 
    Container, 
    Typography, 
    Grid, 
    Link, 
    Button, 
    Box 
} from '@mui/material';
import Sidebar from '../components/Sidebar';
import SupplierFilter from '../components/Suppliers/SupplierFilter';
import SupplierSearch from '../components/Suppliers/SupplierSearch';
import ProductsDataGrid from '../components/Products/ProductsDataGrid';

const sectionTitleStyle = {
    fontFamily: 'poppins',
    fontWeight: 600,
    fontSize: '30px',
    marginBottom: '20px',
};

export default function Suppliers() {
    return (
        <Sidebar>
            <Container 
                disableGutters={true} 
                maxWidth={false} 
                sx={{
                    width: '85%', 
                    margin: '100px 0px 0px 100px'
                }}
            >
                {/* Title */}
                <Typography sx={sectionTitleStyle}>
                    Products
                </Typography>

                <Grid container spacing={2}>
                    {/* Left side: SupplierSearch and SupplierFilter */}
                    <Grid item xs={12} sm={6} md={8} sx={{ display: 'flex', gap: 2 }}>
                        <SupplierSearch />
                        <SupplierFilter />
                    </Grid>

                </Grid>

                {/* Data Grid Section */}
                <Grid container sx={{ marginTop: '40px' }}>
                    <ProductsDataGrid />
                </Grid>
            </Container>
        </Sidebar>
    );
}
