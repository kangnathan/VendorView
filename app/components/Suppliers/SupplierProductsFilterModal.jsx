'use client';
import React, { useMemo } from 'react';
import { useProductContext } from '@/app/context/ProductsContext';
import { useSupplierContext } from '@/app/context/SuppliersContext';
import CustomFilterModal from '@/app/components/CustomFilterModal';
import { useParams } from 'next/navigation';

const SupplierProductsFilterModal = () => {
  const { id } = useParams();
  const { open, handleClose, productsData, filters, setFilters } = useProductContext();
  const { suppliersData } = useSupplierContext();

  const supplier = suppliersData.find((supplier) => supplier.id === Number(id));

  const filterFields = useMemo(
    () => [
      { label: 'Name', field: 'name' },
      { label: 'Price', field: 'price' },
      { label: 'Type', field: 'type' },
    ],
    []
  );

  const supplierProducts = useMemo(() => {
    return productsData.filter(
      (product) => product.supplierId === supplier?.id && !product.isDeleted
    );
  }, [productsData, supplier]);

  return (
    <CustomFilterModal
      open={open}
      handleClose={handleClose}
      data={supplierProducts}
      filters={filters}
      setFilters={setFilters}
      filterFields={filterFields}
      title="Product"
    />
  );
};

export default SupplierProductsFilterModal;
