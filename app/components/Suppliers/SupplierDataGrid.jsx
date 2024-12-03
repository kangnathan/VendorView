'use client';
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useSupplierContext } from '@/app/context/SuppliersContext';

const SupplierGrid = () => {
  const { suppliersData } = useSupplierContext();

  const handleViewDetails = (supplierId) => {
    window.open(`/supplier-edit-page?supplierId=${supplierId}`, '_blank');
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'tin', headerName: 'TIN', width: 100 },
    { field: 'location', headerName: 'Location', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => (
        <IconButton onClick={() => handleViewDetails(params.row.id)}>
          <VisibilityIcon />
        </IconButton>
      ),
    },
  ];

  const rows = suppliersData.map((supplier) => ({
    id: supplier.id,
    name: supplier.name,
    email: supplier.email,
    phone: supplier.phone,
    location: supplier.location,
    tin: supplier.tin || '',
  }));

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
};

export default SupplierGrid;
