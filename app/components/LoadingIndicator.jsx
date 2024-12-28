// LoadingIndicator.js
import React from 'react';
import { CircularProgress, Box, Container } from '@mui/material';
import Sidebar from '@/app/components/Sidebar'; // Make sure the Sidebar component is imported correctly

const LoadingIndicator = () => {
  return (
    <Sidebar>
      <Container component="main" maxWidth="lg">
        <Box
          sx={{
            height: '100vh', // Full height of the viewport
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress size={40} sx={{ color: '#A35422' }} />
        </Box>
      </Container>
    </Sidebar>
  );
};

export default LoadingIndicator;
