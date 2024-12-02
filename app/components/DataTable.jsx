'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

export default function DataTable({ rows, columns }) {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </Box>
  );
}
