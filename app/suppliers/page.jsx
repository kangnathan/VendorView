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
import SupplierDataGrid from '../components/Suppliers/SupplierDataGrid';
import AddBusinessRoundedIcon from '@mui/icons-material/AddBusinessRounded';

const buttonStyle = {
    marginTop: '5px',
    padding: '10px 25px',
    borderRadius: '10px',
    backgroundColor: '#A35422',
    fontFamily: 'poppins',
    fontWeight: 500,
    color: '#fff',
    '&:hover': {
        backgroundColor: '#EFD5A4',
        color: '#000',
    },
};

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
                    Suppliers
                </Typography>

                <Grid container spacing={2}>
                    {/* Left side: SupplierSearch and SupplierFilter */}
                    <Grid item xs={12} sm={6} md={8} sx={{ display: 'flex', gap: 2 }}>
                        <SupplierSearch />
                        <SupplierFilter />
                    </Grid>

                    {/* Right side: SupplierAdd Button */}
                    <Grid 
                        item 
                        xs={12} 
                        sm={6} 
                        md={4} 
                        sx={{ display: 'flex', justifyContent: 'flex-end' }}
                    >
                        <Box>
                            <Button 
                                variant="contained" 
                                sx={buttonStyle}
                                startIcon={<AddBusinessRoundedIcon />}
                                component={Link}
                                href="/supplier-create-page"
                            >
                                ADD
                            </Button>
                        </Box>
                    </Grid>
                </Grid>

                {/* Data Grid Section */}
                <Grid container sx={{ marginTop: '40px' }}>
                    <SupplierDataGrid />
                </Grid>
            </Container>
        </Sidebar>
    );
}
