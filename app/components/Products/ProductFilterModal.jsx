'use client';
import React, { useMemo } from 'react';
import { useProductContext } from '@/app/context/ProductsContext';
import { useSupplierContext } from '@/app/context/SuppliersContext';
import CustomFilterModal from '../CustomFilterModal';

const ProductFilterModal = () => {
  const { open, handleClose, productsData, filters, setFilters } = useProductContext();
  const { suppliersData } = useSupplierContext();

  const filterFields = useMemo(
    () => [
      { label: 'Name', field: 'name' },
      { label: 'Price', field: 'price' },
      { label: 'Type', field: 'type' },
      { label: 'Supplier', field: 'supplier' },
    ],
    []
  );

  const combinedData = useMemo(() => {
    if (!productsData || !suppliersData) return [];
    return productsData.map((product) => ({
      ...product,
      supplier: suppliersData.find((s) => s.id === product.supplierId)?.name || 'Unknown Supplier',
    }));
  }, [productsData, suppliersData]);

  return (
    <CustomFilterModal
      open={open}
      handleClose={handleClose}
      data={combinedData}
      filters={filters}
      setFilters={setFilters}
      filterFields={filterFields}
      title="Product"
    />
  );
};

export default ProductFilterModal;
