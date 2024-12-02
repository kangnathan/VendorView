'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import DataTable from '../DataTable';
import { useProductContext } from '@/app/context/ProductsContext'; // Import the context hook
import OpenInNew from '../OpenInNew';  // Import the OpenInNew component
import Delete from '../Delete';  // Import the Delete component

const columns = [
  {
    field: 'name',
    headerName: 'Name',
    width: 250,
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 250,
  },
  {
    field: 'type',
    headerName: 'Type',
    width: 200,
  },
  {
    field: 'supplier',
    headerName: 'Supplier',
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
  const { productsData, error } = useProductContext(); // Access suppliers data from context

  if (error) {
    return <div>Error: {error}</div>; // Display error if any
  }

  // Map supplier data into rows for the DataTable
const rows = productsData.map((product) => ({
  id: product.id, // Keep the id here for any internal use
  name: product.name,
  price: product.price,
  type: product.type,
  supplier: product.supplier?.name, // Access the supplier's name
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
