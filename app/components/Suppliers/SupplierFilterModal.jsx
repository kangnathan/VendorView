'use client';
import React from 'react';
import { useSupplierContext } from '@/app/context/SuppliersContext';
import CustomFilterModal from '@/app/components/CustomFilterModal';

const SupplierFilterModal = () => {
  const { open, handleClose, suppliersData, filters, setFilters } = useSupplierContext();

  const filterFields = [
    { label: 'Name', field: 'name' },
    { label: 'Email', field: 'email' },
    { label: 'Phone', field: 'phone' },
    { label: 'TIN', field: 'tin' },
    { label: 'Location', field: 'location' },
  ];

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
  );
};

export default SupplierFilterModal;
