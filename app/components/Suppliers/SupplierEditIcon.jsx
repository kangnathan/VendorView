import EditRoundedIcon from '@mui/icons-material/EditRounded';
import React from 'react';
import IconButton from '@mui/material/IconButton';


const SupplierEditIcon = ({ supplierId }) => {
  // Open the details page for the supplier
  const handleViewDetails = () => {
    window.open(`suppliers/supplier-edit-page/${supplierId}`);

  };

  return (
    <IconButton onClick={handleViewDetails}>
      <EditRoundedIcon />
    </IconButton>
  );
};

export default SupplierEditIcon;