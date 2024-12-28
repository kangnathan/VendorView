'use client'
import React from 'react'
import DataTable from './CustomDataTable'
import ProductDeleteIcon from '@/app/components/Products/ProductDeleteIcon'
import ProductEditIcon from '@/app/components/Products/ProductEditIcon'
import { useSupplierContext } from '@/app/context/SuppliersContext'
import { useParams } from 'next/navigation'

const SupplierProductsDataGrid = () => {
  const { id } = useParams()
  const { suppliersData } = useSupplierContext()

  const supplier = suppliersData.find((supplier) => supplier.id === Number(id))

  if (!supplier) {
    return <p>Supplier not found</p>
  }

  const rows =
    supplier.products
      .filter(product => product.isDeleted === false)
      .map((product) => ({
        id: product.id,
        name: product.name,
        type: product.type,
        price: product.price,
      })) || []

  const columns = [
    { field: 'name', headerName: 'Product Name', width: 250 },
    { field: 'type', headerName: 'Type', width: 200 },
    { field: 'price', headerName: 'Price', width: 150, type: 'number' },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <ProductEditIcon productId={params.row.id} />
          <ProductDeleteIcon productId={params.row.id} />
        </>
      ),
    },
  ]

  return (
    <div style={{ height: 700, width: '100%' }}>
      <DataTable rows={rows} columns={columns} pageSize={5} />
    </div>
  )
}

export default SupplierProductsDataGrid
