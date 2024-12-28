'use client'
import React, { useMemo } from 'react'
import { useProductContext } from '@/app/context/ProductsContext'
import { useSupplierContext } from '@/app/context/SuppliersContext'
import DataTable from '../CustomDataTable'
import { LinearProgress, Box, Typography } from '@mui/material'
import ProductDeleteIcon from '@/app/components/Products/ProductDeleteIcon'
import ProductEditIcon from '@/app/components/Products/ProductEditIcon'
import { useParams } from 'next/navigation'

const SuppliersProducts = () => {
  const { id } = useParams()
  const { search, productsData, filters } = useProductContext()
  const { suppliersData } = useSupplierContext()

    const supplier = useMemo(() => suppliersData.find((supplier) => supplier.id === Number(id)),
    [suppliersData, id]
  )

  const isLoading = !supplier || !supplier.products
  const hasNoProducts = supplier && supplier.products && supplier.products.length === 0


  const rows = useMemo(() => {
    if (isLoading) return []

    const searchLower = search.trim().toLowerCase()

    return supplier.products
      ?.filter((product) => !product.isDeleted)
      .filter((product) => {
        return Object.entries(filters).every(([key, value]) => {
          if (!value) return true

          const productValue = product[key]
          return productValue
            ?.toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        })
      })
      .filter((product) => {
        if (!searchLower) return true

        return (
          product.name?.toLowerCase().includes(searchLower) ||
          product.price?.toString().includes(searchLower) ||
          product.type?.toLowerCase().includes(searchLower) 
        )
      })
      .map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        type: product.type,
      }))
  }, [productsData, filters, search, isLoading])

  const columns = useMemo(
    () => [
      { field: 'name', headerName: 'Name', width: 250 },
      { field: 'price', headerName: 'Price', width: 250 },
      { field: 'type', headerName: 'Type', width: 250 },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 150,
        renderCell: ({ row }) => (
          <>
            <ProductEditIcon productId={row.id} />
            <ProductDeleteIcon productId={row.id} />
          </>
        ),
      },
    ],
    []
  )

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

export default SuppliersProducts
