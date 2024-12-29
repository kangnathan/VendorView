'use client';
import React, { useMemo } from 'react';
import { Box, LinearProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const CustomDataGrid = ({
  data = [],
  filters = {},
  search = '',
  getFilteredRows,
  columns,
  isLoading = false,
  height = 600,
  pageSize = 5,
}) => {
  const rows = useMemo(() => {
    if (isLoading) return [];
    const searchLower = search.trim().toLowerCase();
    return getFilteredRows ? getFilteredRows(data, filters, searchLower) : data;
  }, [data, filters, search, isLoading, getFilteredRows]);

  return (
    <Box
      sx={{
        height,
        width: '100%',
        display: 'flex',
        flexDirection: 'column', // Ensure proper layout stacking
        position: 'relative',
      }}
    >
      {isLoading ? (

          <LinearProgress
            sx={{
              width: '100%', 
              '& .MuiLinearProgress-bar': { backgroundColor: '#A5463A' },
              backgroundColor: '#F1EDE3',
            }}
          />
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          sx={{
            flexGrow: 1,
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#F1EDE3',
              color: '#A5463A',
              fontWeight: 'bold',
            },
          }}
        />
      )}
    </Box>
  );
};

export default CustomDataGrid;
