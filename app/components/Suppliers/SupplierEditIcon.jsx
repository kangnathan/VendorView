import EditRoundedIcon from '@mui/icons-material/EditRounded';
import React from 'react';
import IconButton from '@mui/material/IconButton';
import { useParams } from 'next/navigation';

const SupplierEditIcon = ({ supplierId }) => {
  const { id: paramId } = useParams();

  const idToUse = supplierId ?? paramId;

  const handleViewDetails = () => {
    if (idToUse) {
      window.open(`/suppliers/supplier-edit-page/${idToUse}`);
    } else {
      console.error('Supplier ID is missing');
    }
  };

  return (
    <IconButton onClick={handleViewDetails}>
      <EditRoundedIcon />
    </IconButton>
  );
};

export default SupplierEditIcon;
