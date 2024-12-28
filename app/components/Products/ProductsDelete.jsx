import React from 'react';
import { Box, Button } from '@mui/material'
import { useSupplierContext } from '@/app/context/SuppliersContext'

const SupplierDelete = () => {

  const {
    handleDeleteModalOpen,
  } = useSupplierContext()

  return (
    <Box>
      <Button
        variant="contained"
        onClick={handleDeleteModalOpen} 
        sx={{
          marginTop: '5px',
          padding: '10px 29px 11px 25px',
          borderRadius: '10px',
          backgroundColor: '#A5463A',
          fontFamily: 'Poppins',
          fontWeight: 500,
          marginRight: '20px',
        }}
      >
        DELETE
      </Button>  
    </Box>
  )
}

export default SupplierDelete
