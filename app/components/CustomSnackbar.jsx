import React from "react"
import Snackbar from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"
import { useSnackbarContext } from '@/app/context/SnackbarContext'

const CustomSnackbar = () => {
  const { snackbar, toggleSnackbar } = useSnackbarContext();

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={3000}
      onClose={() => toggleSnackbar(false)}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      sx={{ borderRadius: '20px' }}
    >
      <Alert
        onClose={() => toggleSnackbar(false)}
        severity={snackbar.severity}
        variant="filled"
        sx={{
          fontFamily: 'poppins',
          borderRadius: '12px',
          backgroundColor: snackbar.severity === 'success' ? '#6B8E23' : undefined,
          color: '#ffffff',
        }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar
