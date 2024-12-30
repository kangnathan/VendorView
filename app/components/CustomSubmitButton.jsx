import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import { customSubmitButtonStyles } from '@/app/styles/CustomSubmitButtonStyles';

const CustomSubmitButton = ({ loading, onClick, text, backgroundColor = '#A35422', ...props }) => {
  return (
    <Button
      type="submit" 
      variant="contained"
      sx={customSubmitButtonStyles.button(backgroundColor)} 
      onClick={onClick} 
      disabled={loading} 
      {...props} 
    >
      {loading ? <CircularProgress size={24} /> : text}
    </Button>
  );
}

export default CustomSubmitButton;
