import { useState } from "react";
import { Checkbox, Box, Typography, Grid, TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import SignIn from './SignIn'
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";

export default function SignInForm() {

      const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault(); // Prevents focus loss on icon click
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
    return (
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
                Sign in
              </Typography>
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
                        fontSize: '15px'
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
            fontSize: '15px'
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
              sx={{
                display: "flex",
                alignItems: "center",
                marginTop: 0.7,
              }}
            >
              <Checkbox size="small" sx={{ paddingLeft: "0px" }} />
              <Typography variant="body2" sx={{ fontFamily: 'poppins', marginLeft: 0.7 }}>
                Remember me
              </Typography>
            </Grid>

            <Grid
              item
              xs={12}
              sx={{ marginTop: 1.4, textAlign: "left" }}
            >
          <SignIn/>

            </Grid>

            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "left",
                alignItems: "left",
                marginTop: 1.4,
              }}
            >
              <Typography variant="body2" sx={{ fontFamily: 'poppins', marginRight: 1.4 }}>
                Or continue with
              </Typography>

              <IconButton
                sx={{
                  width: 25,
                  height: 25,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 0.7,
                  borderRadius: "50%",
                }}
              >
                <FacebookIcon fontSize="small" sx={{ color: "#3B5998" }} />
              </IconButton>

              <IconButton
                sx={{
                  backgroundColor: "#E72734",
                  width: 25,
                  height: 25,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 0.7,
                  borderRadius: "50%",
                  "&:hover": { backgroundColor: "#3367D6" },
                }}
              >
                <GoogleIcon fontSize="small" sx={{ color: "white" }} />
              </IconButton>
            </Grid>
          </Grid>

    )
}