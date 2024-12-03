"use client";
import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Container,
  Button,
  Typography,
  TextField,
  CircularProgress,
} from "@mui/material";
import Sidebar from "../components/Sidebar";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import {
  textFieldStyle,
  buttonStyle,
  sectionTitleStyle,
} from "@/app/styles/SupplierFormStyles";
import Link from "next/link";
import { useSupplierContext } from "@/app/context/SuppliersContext";
import { useSearchParams } from "next/navigation";

export default function SupplierEditPage() {
  const searchParams = useSearchParams();
  const { getSupplierById, updateSupplier } = useSupplierContext();
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const supplierId = parseInt(searchParams.get("supplierId"), 10); // Retrieve supplierId from query
    if (supplierId) {
      const fetchedSupplier = getSupplierById(supplierId);
      setSupplier(fetchedSupplier);
    }
  }, [searchParams, getSupplierById]);

  if (!supplier) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "97vh",
          width: "97vw",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const handleChange = (e) => {
    setSupplier({ ...supplier, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const updatedSupplier = await updateSupplier(supplier.id, {
        name: supplier.name,
        tin: supplier.tin,
        location: supplier.location,
        email: supplier.email,
        phone: supplier.phone,
      });
    //   if (updatedSupplier) {
    //     alert("Supplier updated successfully!");
    //   } else {
    //     alert("Failed to update supplier.");
    //   }
    } catch (error) {
      console.error("Error updating supplier:", error);
      alert("An error occurred while updating the supplier.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sidebar>
      <Container component="main" maxWidth="lg">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
                    <Typography sx={sectionTitleStyle}>General</Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          autoComplete="name"
                          name="name"
                          variant="outlined"
                          value={supplier.name}
                          onChange={handleChange}
                          required
                          fullWidth
                          id="name"
                          label="Name"
                          autoFocus
                          sx={textFieldStyle}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          variant="outlined"
                          value={supplier.tin}
                          onChange={handleChange}
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
                          value={supplier.location}
                          onChange={handleChange}
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
                    <Typography
                      sx={{ ...sectionTitleStyle, marginBottom: "0px" }}
                    >
                      Contacts
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container spacing={2} sx={{ marginBottom: "40px" }}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          autoComplete="email"
                          name="email"
                          value={supplier.email}
                          onChange={handleChange}
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
                          autoComplete="phone"
                          name="phone"
                          variant="outlined"
                          value={supplier.phone}
                          onChange={handleChange}
                          required
                          fullWidth
                          id="phone"
                          label="Phone No."
                          autoFocus
                          sx={textFieldStyle}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid item xs={12} sx={{ marginBottom: "100px" }}>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box>
                  <Button
                    variant="contained"
                    sx={{
                      marginTop: "5px",
                      padding: "10px 25px",
                      borderRadius: "10px",
                      backgroundColor: "#A35422",
                      fontFamily: "poppins",
                      fontWeight: 500,
                      marginRight: "20px",
                    }}
                    onClick={handleUpdate}
                    disabled={loading}
                  >
                    {loading ? <CircularProgress size={24} /> : "UPDATE"}
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Sidebar>
  );
}
