'use client'
import { Checkbox, Box, Typography, Grid, TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";
import Link from "next/link";
import Management from "@/app/assets/Management.png";
import Image from "next/image";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import SignUpButton from '@/app/components/Signup/SignUpButton'
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault(); // Prevents focus loss on icon click
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };


  return (
    <>
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
        padding: 1.4, // Reduced padding proportionally
      }}
          >
              
              


      <Grid
        container
        spacing={3} // Slightly reduced spacing
        sx={{
          backgroundColor: "#F7F7F5",
          borderRadius: "18px",
          boxShadow: 3,
          padding: { xs: 5.1, sm: 8.8 }, // Reduced padding proportionally
          maxWidth: {
            xs: "75%", // Extra small screens
            sm: "80%", // Small screens
            md: "70%", // Medium screens
            lg: "60%", // Large screens
            xl: "55%", // Extra large screens
            xxl: "50%", // Ultra large screens (custom if defined in theme)
          }, // Scaled down by 30%
        }}
              >
                  <Grid item xs={12}>
                                      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '0px' }}>
                    <Typography variant="h6" noWrap sx={{ fontSize: '24px', fontFamily: 'poppins', fontWeight: 800 }}>
                        Vendor <span style={{ color: '#A35422' }}>View</span>
                    </Typography>
                </Box>
                  </Grid>
                  
        {/* Left Section */}
        <Grid item xs={12} sm={6}>
        <Grid container spacing={2} direction="column">
            <Grid item xs={12}>
              <Typography
                sx={{
                  fontFamily: 'poppins',
                    fontWeight: "700",
                    fontSize: '40px',
                  textAlign: "left",
                }}
              >
                Sign Up
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Name"
                type="name"
                variant="standard"
      sx={{
        fontFamily: 'poppins',
        width: '80%',
        '& .MuiInputLabel-root': {
          fontFamily: 'poppins', // Label font
          '&.Mui-focused': {
            color: 'black',
          },
        },
        '& .MuiInputBase-input': {
          fontFamily: 'poppins', // Input text font
        },
        '& .MuiInput-underline': {
          '&:after': {
            borderColor: '#A35422',  // Changes the focused underline color to #A35422
          },
        },
      }}
              />
            </Grid>

            <Grid item xs={12}>
<TextField
  label="Email"
  type="email"
  variant="standard"
      sx={{
        fontFamily: 'poppins',
        width: '80%',
        '& .MuiInputLabel-root': {
          fontFamily: 'poppins', // Label font
          '&.Mui-focused': {
            color: 'black',
          },
        },
        '& .MuiInputBase-input': {
          fontFamily: 'poppins', // Input text font
        },
        '& .MuiInput-underline': {
          '&:after': {
            borderColor: '#A35422',  // Changes the focused underline color to #A35422
          },
        },
      }}
/>

            </Grid>

            <Grid item xs={12}>
    <TextField
      label="Password"
      type={showPassword ? 'text' : 'password'}
      variant="standard"
      sx={{
        fontFamily: 'poppins',
        width: '80%',
        '& .MuiInputLabel-root': {
          fontFamily: 'poppins', // Label font
          '&.Mui-focused': {
            color: 'black',
          },
        },
        '& .MuiInputBase-input': {
          fontFamily: 'poppins', // Input text font
        },
        '& .MuiInput-underline': {
          '&:after': {
            borderColor: '#A35422',  // Changes the focused underline color to #A35422
          },
        },
      }}
      onFocus={() => setFocused(true)} // Set focused to true when input is focused
      onBlur={() => setFocused(false)} // Set focused to false when input is blurred
      InputProps={{
        startAdornment: focused && (
          <InputAdornment position="start">
            <IconButton
              onClick={togglePasswordVisibility}
              onMouseDown={handleMouseDownPassword}
              edge="start"
            >
              {showPassword ? <VisibilityOff fontSize="small"/> : <Visibility fontSize="small" />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />


            </Grid>

            <Grid
              item
              xs={12}
              sx={{ marginTop: 1.4, textAlign: "left" }}
            >
          <SignUpButton/>

            </Grid>
          </Grid>
        </Grid>

        {/* Right Section */}
                  <Grid item xs={12} sm={6}>
                      
          <Grid container spacing={2} direction="column">
            <Grid
              item
              sx={{
                display: { xs: "none", sm: "block", md: "block" }, // Hide image on extra-small screens
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Image
                  src={Management}
                  alt="Management"
                  style={{ width: "76%", height: "auto" }} // Ensures responsive scaling
                  priority // Improves loading for critical images
                />
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              sx={{ marginTop: { sm: 1.4, xs: 0 }, textAlign: "center" }}
            >
              <Typography variant="body2">
<Link
  href="/"
  style={{
    color: "black",
    textDecoration: "none",
    transition: "text-decoration 0.3s ease", // Smooth transition for underline
  }}
  onMouseEnter={(e) => e.target.style.textDecoration = "underline"}
  onMouseLeave={(e) => e.target.style.textDecoration = "none"}
>
  I already have an account
</Link>
              </Typography>
            </Grid>
          </Grid>

          
        </Grid>
      </Grid>
      </Box>
      </>
  );
}
