'use client';
import React, { useMemo } from 'react';
import { Box, LinearProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { customDataGridStyles } from '@/app/styles/CustomDataGridStyles';

const CustomDataGrid = ({
  data = [],
  filters = {},
  search = '',
  getFilteredRows,
  columns,
  isLoading = false,
  pageSize = 5,
  
}) => {
  const rows = useMemo(() => {
    if (isLoading) return [];
    const searchLower = search.trim().toLowerCase();
    return getFilteredRows ? getFilteredRows(data, filters, searchLower) : data;
  }, [data, filters, search, isLoading, getFilteredRows]);

  return (
    <Box sx={customDataGridStyles.container}>
      {isLoading ? (
        <LinearProgress sx={customDataGridStyles.loadingProgress} />
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          disableRowSelectionOnClick // Prevents row selection on click
          disableColumnMenu // Disables the column menu
          isRowSelectable={() => false} // Prevents row selection
          sx={customDataGridStyles.dataGrid}
        />
      )}
    </Box>
  );
};

export default CustomDataGrid;
