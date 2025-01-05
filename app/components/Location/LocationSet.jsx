import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSupplierContext } from '@/app/context/SuppliersContext';
import { useLocationContext } from '@/app/context/LocationContext';
import { Grid, Modal, InputLabel, MenuItem, FormControl, Select, Typography, Box } from '@mui/material';
import { formControlStyle, selectStyle, menuItemStyle, menuPaperStyle } from '@/app/styles/ProductCreatePageStyles';
import { style } from '@/app/styles/FilterModalStyles';
import CustomSubmitButton from '../CustomSubmitButton';

const LocationSet = () => {
  const { suppliersData, updateSupplier } = useSupplierContext();
  const { clickedLocation, open, handleClose, clearClickedLocation } = useLocationContext();

  const [formData, setFormData] = useState({ latitude: '', longitude: '', supplierId: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (clickedLocation) {
      setFormData((prev) => ({
        ...prev,
        latitude: clickedLocation.latitude,
        longitude: clickedLocation.longitude,
      }));
    }
  }, [clickedLocation]);

  const handleChange = useCallback(
    ({ target: { name, value } }) => setFormData((prev) => ({ ...prev, [name]: value })),
    []
  );

  const handleClear = useCallback(() => {
    setFormData({ latitude: '', longitude: '', supplierId: '' });
    clearClickedLocation();
  }, [clearClickedLocation]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        await updateSupplier(formData.supplierId, formData);
        console.log(`Supplier updated: ${formData.supplierId}`);
        handleClear();
        handleClose();
      } catch (error) {
        console.error('Failed to update supplier:', error);
      } finally {
        setLoading(false);
      }
    },
    [formData, updateSupplier, handleClear, handleClose]
  );

  const supplierOptions = useMemo(
    () =>
      suppliersData.map(({ id, name }) => (
        <MenuItem key={id} value={id} sx={menuItemStyle}>
          {name}
        </MenuItem>
      )),
    [suppliersData]
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
          <Typography variant="h6" align="left" sx={{ fontFamily: 'Poppins', mb: 2 }}>
            Set location for:
          </Typography>
        </Grid>

        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
              <FormControl fullWidth required sx={formControlStyle}>
                <InputLabel id="supplier-select-label">Supplier</InputLabel>
                <Select
                  labelId="supplier-select-label"
                  name="supplierId"
                  value={formData.supplierId}
                  onChange={handleChange}
                  sx={selectStyle}
                  MenuProps={{ PaperProps: { sx: menuPaperStyle } }}
                >
                  {supplierOptions}
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}
        >
          <CustomSubmitButton
            loading={false}
            text="CLEAR"
            onClick={handleClear}
            disabled={loading}
          />
          <CustomSubmitButton
            loading={loading}
            text="APPLY"
            onClick={handleSubmit}
            disabled={loading || !formData.supplierId}
          />
        </Grid>
      </Grid>
    </Modal>
  );
};

export default LocationSet;
