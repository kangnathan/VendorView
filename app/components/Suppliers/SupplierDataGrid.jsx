'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import DataTable from '../DataTable';
import { useSupplierContext } from '@/app/context/SuppliersContext'; // Import the context hook
import OpenInNew from '../OpenInNew';  // Import the OpenInNew component
import Delete from '../Delete';  // Import the Delete component

const columns = [
  {
    field: 'name',
    headerName: 'Name',
    width: 250,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 250,
  },
  {
    field: 'phone',
    headerName: 'Phone',
    width: 200,
  },
  {
    field: 'location',
    headerName: 'Location',
    width: 300,
  },
  {
    field: 'pin',
    headerName: 'PIN',
    width: 200,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    renderCell: (params) => (
      <Box sx={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
        <OpenInNew supplierId={params.row.id} /> {/* Pass the supplier ID to OpenInNew */}
        <Delete supplierId={params.row.id} /> {/* Pass the supplier ID to Delete */}
      </Box>
    ),
  },
];

export default function SupplierDataGrid() {
  const { suppliersData, error } = useSupplierContext(); // Access suppliers data from context

  if (error) {
    return <div>Error: {error}</div>; // Display error if any
  }

  // Map supplier data into rows for the DataTable
  const rows = suppliersData.map((supplier) => ({
    id: supplier.id, // Keep the id here for any internal use
    name: supplier.name,
    email: supplier.email,
    phone: supplier.phone,
    location: supplier.location,
    pin: supplier.pin,
  }));

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataTable
        rows={rows} // Pass the dynamic rows
        columns={columns} // Pass the modified columns
      />
    </Box>
  );
}