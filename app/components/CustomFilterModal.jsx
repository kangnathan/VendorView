'use client'
import React, { useMemo } from 'react'
import { Grid, Modal, InputLabel, MenuItem, FormControl, Select, Typography } from '@mui/material'
import CustomSubmitButton from '@/app/components/CustomSubmitButton'
import { style, inputStyles, selectStyles, menuItemStyles } from '@/app/styles/FilterModalStyles'

const CustomFilterModal = ({
  open,
  handleClose,
  data,
  filters,
  setFilters,
  filterFields,
  title,
}) => {
  const handleChange = (field) => (event) => {
    const value = event.target.value
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }))
  }

  const handleClearFilters = () => {
    setFilters(
      Object.keys(filters).reduce((acc, key) => ({ ...acc, [key]: '' }), {})
    )
  }

  const getMenuItems = useMemo(
    () => (field) => {
      const uniqueValues = new Set(
        data
          ?.filter((item) => !item.isDeleted)
          .map((item) => item[field] || 'N/A')
      );
      return Array.from(uniqueValues).map((value) => (
        <MenuItem key={value} value={String(value)} sx={menuItemStyles}>
          {value}
        </MenuItem>
      ));
    },
    [data]
  );

  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby="dynamic-filter-modal-title"
      aria-describedby="dynamic-filter-modal-description"
    >
      <Grid container sx={style} spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" align="left" sx={{ fontFamily: 'Poppins', marginBottom: '20px' }}>
            {title} Filters
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

export default CustomFilterModal
