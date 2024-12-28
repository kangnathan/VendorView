import React from 'react'
import { Button, CircularProgress } from '@mui/material'

const CustomSubmitButton = ({ loading, onClick, text, backgroundColor = '#A35422', ...props }) => {
  return (
    <Button
      type="submit" 
      variant="contained"
      sx={{
        marginTop: '5px',
        padding: '10px 25px 10px 25px',
        borderRadius: '10px',
        backgroundColor: backgroundColor,
        fontFamily: 'Poppins',
        fontWeight: 500,
        marginRight: '20px',
        '&:hover': {
          backgroundColor: backgroundColor, 
        },
      }}
      onClick={onClick} 
      disabled={loading} 
      {...props} 
    >
      {loading ? <CircularProgress size={24} /> : text}
    </Button>
  )
}

export default CustomSubmitButton
