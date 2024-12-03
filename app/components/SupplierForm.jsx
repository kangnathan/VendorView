import React from 'react';
import {
    Button,
    TextField,
    Link,
    Grid,
    Box,
    Typography,
} from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { textFieldStyle, buttonStyle, sectionTitleStyle } from '@/app/styles/SupplierFormStyles'

export default function SupplierForm() {
    return (
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
                        </Grid>
                    </Box>
    );
}
