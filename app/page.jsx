'use client'
import { useReducer, useState, useCallback } from "react"
import { Box, Typography, Grid, TextField, InputAdornment, IconButton } from "@mui/material"
import { Visibility, VisibilityOff } from '@mui/icons-material'
import Link from "next/link"
import Image from "next/image"
import Management from "@/app/assets/Management.png"
import CustomSubmitButton from "@/app/components/CustomSubmitButton"
import CustomSnackbar from "./components/CustomSnackbar"
import { useSnackbarContext } from '@/app/context/SnackbarContext'
import { boxStyles, gridContainerStyles, headerStyles, sharedTextFieldStyles, signInTypographyStyles } from "@/app/styles/SignInPageStyles"
import { useRouter } from 'next/navigation'
import { handleSubmitSignIn } from '@/app/utils/handleSubmitSignIn'

const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.name]: action.value }
    default:
      return state
  }
}

export default function SignInPage() {
  const router = useRouter()
  const { showSnackbar } = useSnackbarContext()
  const [formData, dispatch] = useReducer(formReducer, { email: '', password: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => setShowPassword(prev => !prev)

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target
    dispatch({ type: 'SET_FIELD', name, value })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSubmitSignIn(formData, showSnackbar, router, setIsSubmitting)
  }

  return (
    <Box sx={boxStyles}>
      <CustomSnackbar />
      <Grid container spacing={3} sx={gridContainerStyles}>
        <Grid item xs={12}>
          <Typography variant="h6" sx={headerStyles}>
            Vendor <span style={{ color: '#A35422' }}>View</span>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={2} direction="column" alignItems="center">
            <Grid item sx={{ display: { xs: "none", sm: "block" } }}>
              <Image src={Management} alt="Management" style={{ width: "76%", height: "auto" }} priority />
            </Grid>
            <Grid item>
              <Typography variant="body2">
                <Link
                  href="/sign-up"
                  style={{ color: "black", textDecoration: "none" }}
                  onMouseEnter={(e) => e.target.style.textDecoration = "underline"}
                  onMouseLeave={(e) => e.target.style.textDecoration = "none"}
                >
                  Create an account
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <Typography sx={signInTypographyStyles}>Sign in</Typography>
            </Grid>
            <Grid item>
              <TextField
                id="email"
                name="email"
                label="Email"
                type="text"
                value={formData.email}
                onChange={handleInputChange}
                variant="standard"
                sx={sharedTextFieldStyles}
              />
            </Grid>
            <Grid item>
              <TextField
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
                variant="standard"
                sx={sharedTextFieldStyles}
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
              <CustomSubmitButton
                text={isSubmitting ? "Submitting..." : "Submit"}
                style={{ textTransform: 'none' }}
                onClick={handleSubmit}
                disabled={isSubmitting}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}
