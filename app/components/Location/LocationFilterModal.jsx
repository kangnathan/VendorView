'use client'
import React from 'react'
import { useSupplierContext } from '@/app/context/SuppliersContext'
import CustomFilterModal from '@/app/components/CustomFilterModal'

const LocationFilterModal = () => {
  const { open, handleClose, suppliersData, filters, setFilters } = useSupplierContext()

  const filterFields = [
    { label: 'Name', field: 'name' },
  ]

  return (
    <CustomFilterModal
      open={open}
      handleClose={handleClose}
      data={suppliersData}
      filters={filters}
      setFilters={setFilters}
      filterFields={filterFields}
      title="Supplier"
    />
  )
}

export default LocationFilterModal
