import React from 'react';
import {
    Button,
    TextField,
    Link,
    Grid,
    Box,
    Typography,
    Container,
} from '@mui/material';
import Sidebar from '../components/Sidebar';
import SupplierCreate from '../components/Suppliers/SupplierCreate';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

const textFieldStyle = {
    fontFamily: 'poppins',
    backgroundColor: '#F7F7F5',
    borderRadius: '16px',
    '& .MuiOutlinedInput-root': {
        borderRadius: '16px',
        fontFamily: 'poppins',
        '& fieldset': {
            borderColor: 'none',
            borderWidth: '2px',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#A35422',
        },
        '&:hover fieldset': {
            borderColor: '#A35422',
        },
    },
    '& .MuiInputLabel-root': {
        fontFamily: 'poppins',
        '&.Mui-focused': {
            color: '#A35422',
        },
    },
};

const buttonStyle = {
    color: '#A35422',
    marginTop: '5px',
    marginBottom: '20px',
    padding: '10px 25px 10px 10px',
    borderRadius: '10px',
    backgroundColor: '#F1EDE3',
    fontFamily: 'poppins',
    fontWeight: 700,
    '&:hover': {
        backgroundColor: '#EFD5A4',
    },
};

const sectionTitleStyle = {
    fontFamily: 'poppins',
    fontWeight: 600,
    fontSize: '30px',
};

export default function SupplierCreatePage() {
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
                    <Box component="form" noValidate sx={{ mt: 3 }}>
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
                                <Typography sx={sectionTitleStyle}>
                                    General
                                </Typography>
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
                                            label=" Name"
                                            autoFocus
                                            sx={textFieldStyle}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="tin"
                                            label="TIN"
                                            name="tin"
                                            autoComplete="tin"
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
                                            autoComplete="location"
                                            sx={textFieldStyle}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography sx={{ ...sectionTitleStyle, marginBottom: '0px' }}>
                                    Contacts
                                </Typography>
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
                                            autoFocus
                                            sx={textFieldStyle}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}></Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            autoComplete="fname"
                                            name="firstName"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="firstName"
                                            label="Phone No."
                                            autoFocus
                                            sx={textFieldStyle}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} sx={{ marginBottom: '100px' }}>
                                <SupplierCreate />
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </Sidebar>
    );
}
