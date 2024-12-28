'use client'
import React, { useMemo } from 'react'
import { useSupplierContext } from '@/app/context/SuppliersContext'
import DataTable from '../CustomDataTable'
import SupplierDeleteIcon from './SupplierDeleteIcon'
import SupplierEditIcon from './SupplierEditIcon'
import CustomTypographyLink from '@/app/components/CustomTypographyLink'
import { LinearProgress, Box } from '@mui/material'

const SupplierDataGrid = () => {
  const { suppliersData, search, filters, applyFilters } = useSupplierContext()

  const isLoading = useMemo(() => !suppliersData || suppliersData.length === 0, [suppliersData])

  const matchesSearch = (value, searchLower) => value?.trim().toLowerCase().includes(searchLower)

  const rows = useMemo(() => {
    const searchLower = search.trim().toLowerCase()

    return (applyFilters(suppliersData?.filter((supplier) => !supplier.isDeleted) || [], filters) || [])
      .filter((supplier) => {
        if (!searchLower) return true
        return (
          matchesSearch(supplier.name, searchLower) ||
          matchesSearch(supplier.email, searchLower) ||
          matchesSearch(supplier.phone, searchLower) ||
          matchesSearch(supplier.location, searchLower) ||
          matchesSearch(supplier.tin, searchLower)
        )
      })
      .map(({ id, name, email, phone, location, tin }) => ({
        id,
        name,
        email,
        phone,
        location,
        tin: tin || '',
      }))
  }, [suppliersData, filters, search, applyFilters])

  const columns = useMemo(() => [
    {
      field: 'name',
      headerName: 'Name',
      width: 210,
      renderCell: (params) => (
        <CustomTypographyLink text={params.row.name} href={`/supplier-page/${params.row.id}`} color="black" />
      ),
    },
    { field: 'email', headerName: 'Email', width: 230 },
    { field: 'phone', headerName: 'Phone', width: 200 },
    { field: 'tin', headerName: 'TIN', width: 190 },
    { field: 'location', headerName: 'Location', width: 170 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <SupplierEditIcon supplierId={params.row.id} />
          <SupplierDeleteIcon supplierId={params.row.id} />
        </>
      ),
    },
  ], [])

  return (
    <div style={{ height: 700, width: '100%' }}>
      {isLoading ? (
        <Box sx={{ width: '100%' }}>
          <LinearProgress
            sx={{
              '& .MuiLinearProgress-bar': { backgroundColor: '#A5463A' },
              backgroundColor: '#F1EDE3',
            }}
          />
        </Box>
      ) : (
        <DataTable rows={rows} columns={columns} pageSize={5} />
      )}
    </div>
  )
}

export default SupplierDataGrid
