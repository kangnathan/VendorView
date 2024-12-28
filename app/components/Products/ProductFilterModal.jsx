'use client'
import React, { useMemo } from 'react'
import { Grid, Modal, InputLabel, MenuItem, FormControl, Select, Typography } from '@mui/material'
import CustomSubmitButton from '../CustomSubmitButton'
import { useProductContext } from '@/app/context/ProductsContext'
import { useSupplierContext } from '@/app/context/SuppliersContext'
import { style, inputStyles, selectStyles, menuItemStyles } from '@/app/styles/FilterModalStyles'


const ProductFilterModal = () => {
  const { open, handleClose, productsData, filters, setFilters } = useProductContext()
  const { suppliersData } = useSupplierContext()

  const handleChange = (field) => (event) => {
    const value = event.target.value
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }))
  }

  const handleClearFilters = () => {
    setFilters({
      name: '',
      price: '',
      type: '',
      supplier: '',
    })
  }

  const filterFields = useMemo(
    () => [
      { label: 'Name', field: 'name' },
      { label: 'Price', field: 'price' },
      { label: 'Type', field: 'type' },
      { label: 'Supplier', field: 'supplier' },
    ],
    []
  )

  const getMenuItems = useMemo(
    () => (field) => {
      const sourceData = field === 'supplier' ? suppliersData : productsData

      return sourceData
        ?.filter((item) => !item.isDeleted)
        .map((item) => {
          const value = field === 'supplier' ? item.name : item[field]
          return (
            <MenuItem key={item.id} value={String(value)} sx={menuItemStyles}>
              {value}
            </MenuItem>
          )
        }) || []
    },
    [productsData, suppliersData]
  )

  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby="product-filter-modal-title"
      aria-describedby="product-filter-modal-description"
    >
      <Grid container sx={style} spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" align="left" sx={{ fontFamily: 'Poppins', marginBottom: '20px' }}>
            Product Filters
          </Typography>
        </Grid>

        <Grid container item xs={12} spacing={2}>
          {filterFields.map(({ label, field }) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={field}>
              <FormControl sx={{ width: '100%', ...inputStyles }} size="small">
                <InputLabel id={`${field}-select-label`}>{label}</InputLabel>
                <Select
                  labelId={`${field}-select-label`}
                  id={`${field}-select`}
                  value={filters[field] || ''}
                  label={label}
                  onChange={handleChange(field)}
                  sx={selectStyles}
                >
                  <MenuItem value="" sx={menuItemStyles}>
                    None
                  </MenuItem>
                  {getMenuItems(field)}
                </Select>
              </FormControl>
            </Grid>
          ))}
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <CustomSubmitButton text="CLEAR" onClick={handleClearFilters} />
          <CustomSubmitButton text="APPLY" onClick={handleClose} />
        </Grid>
      </Grid>
    </Modal>
  )
}

export default ProductFilterModal
