'use client'
import React, { useMemo } from 'react'
import Grid from '@mui/material/Grid'
import Modal from '@mui/material/Modal'
import { InputLabel, MenuItem, FormControl, Select, Typography } from '@mui/material'
import CustomSubmitButton from '../CustomSubmitButton'
import { useSupplierContext } from '@/app/context/SuppliersContext'
import { style, inputStyles, selectStyles, menuItemStyles } from '@/app/styles/FilterModalStyles'

const SupplierFilterModal = () => {
  const { open, handleClose, suppliersData, filters, setFilters } = useSupplierContext()

  const handleChange = (field) => (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: event.target.value,
    }))
  }

  const handleClearFilters = () => {
    setFilters(Object.keys(filters).reduce((acc, key) => ({ ...acc, [key]: '' }), {}))
  }

  const filterFields = [
    { label: 'Name', field: 'name', dataKey: 'name' },
    { label: 'Email', field: 'email', dataKey: 'email' },
    { label: 'Phone', field: 'phone', dataKey: 'phone' },
    { label: 'TIN', field: 'tin', dataKey: 'tin' },
    { label: 'Location', field: 'location', dataKey: 'location' },
  ]

  const filteredSuppliers = useMemo(
    () => suppliersData.filter((supplier) => !supplier.isDeleted),
    [suppliersData]
  )

  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Grid container sx={style} spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            align="left"
            sx={{ fontFamily: 'Poppins', marginBottom: '20px' }}
          >
            Supplier Filters
          </Typography>
        </Grid>
        <Grid container item xs={12} spacing={2}>
          {filterFields.map(({ label, field, dataKey }) => (
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
                  {filteredSuppliers.map((supplier) => (
                    <MenuItem
                      key={supplier.id}
                      value={supplier[dataKey] || ''}
                      sx={menuItemStyles}
                    >
                      {supplier[dataKey] || 'N/A'}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          ))}
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}
        >
          <CustomSubmitButton text="CLEAR" onClick={handleClearFilters} />
          <CustomSubmitButton text="APPLY" onClick={handleClose} />
        </Grid>
      </Grid>
    </Modal>
  )
}

export default SupplierFilterModal
