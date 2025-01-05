'use client'
import { Box, Typography, Grid, TextField, IconButton, InputAdornment } from "@mui/material"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Visibility, VisibilityOff } from '@mui/icons-material'
import Management from "@/app/assets/Management.png"
import CustomSubmitButton from "../components/CustomSubmitButton"
import CustomSnackbar from "../components/CustomSnackbar"
import { containerStyles, gridContainerStyles, titleStyles, textFieldStyles, imageStyles, linkStyles } from '@/app/styles/SignUpPageStyles'
import { useSnackbarContext } from '@/app/context/SnackbarContext'

export default function SignUpPage() {
  const { showSnackbar } = useSnackbarContext()
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })

  const togglePasswordVisibility = () => setShowPassword(prev => !prev)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })

    const data = await response.json()

    if (!data.success) {
      const errorMessages = data.errors ? Object.values(data.errors).join(", ") : "An unexpected error occurred."
      showSnackbar(errorMessages, "warning")
      return
    }

    router.push("/")
    showSnackbar("Account created successfully!", "success")
  }

  return (
    <Box sx={containerStyles}>
      <CustomSnackbar />
      <Grid container spacing={3} sx={gridContainerStyles}>
        <Grid item xs={12}>
          <Typography variant="h6" sx={titleStyles}>
            Vendor <span style={{ color: '#A35422' }}>View</span>
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <Typography sx={{ fontWeight: 700, fontSize: '40px' }}>Sign Up</Typography>
            </Grid>

            <Grid item>
              <TextField
                label="Name"
                variant="standard"
                sx={textFieldStyles}
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>

            <Grid item>
              <TextField
                label="Email"
                type="email"
                variant="standard"
                sx={textFieldStyles}
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>

            <Grid item>
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="standard"
                sx={textFieldStyles}
                name="password"
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item sx={{ marginTop: 1.4 }}>
              <CustomSubmitButton text='Submit' style={{ textTransform: 'none' }} onClick={handleSubmit} />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Grid container spacing={2} direction="column" alignItems="center">
            <Grid item sx={{ display: { xs: "none", sm: "block" } }}>
              <Image src={Management} alt="Management" style={imageStyles} priority />
            </Grid>

            <Grid item>
              <Typography variant="body2">
                <Link href="/" style={linkStyles}>
                  I already have an account
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}
