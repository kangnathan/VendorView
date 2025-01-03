'use client';
import React, { useMemo } from 'react';
import { useProductContext } from '@/app/context/ProductsContext';
import { useSupplierContext } from '@/app/context/SuppliersContext';
import CustomDataGrid from '../CustomDataGrid';
import ProductDeleteIcon from '@/app/components/Products/ProductDeleteIcon';
import ProductEditIcon from '@/app/components/Products/ProductEditIcon';

const ProductsDataGrid = () => {
  const { search, productsData, filters } = useProductContext();
  const { suppliersData } = useSupplierContext();

  const isLoading = useMemo(
    () => !(productsData?.length && suppliersData?.length),
    [productsData, suppliersData]
  );

  const getSupplierName = (supplierId) => {
    const supplier = suppliersData?.find((s) => s.id === supplierId);
    return supplier ? supplier.name : 'Unknown Supplier';
  };

  const getFilteredRows = (data, filters, searchLower) => {
    return data
      ?.filter((product) => !product.isDeleted)
      .filter((product) =>
        Object.entries(filters).every(([key, value]) => {
          if (!value) return true;
          if (key === 'supplier') {
            return getSupplierName(product.supplierId)
              .toLowerCase()
              .includes(value.toLowerCase());
          }
          const productValue = product[key];
          return productValue
            ?.toString()
            .toLowerCase()
            .includes(value.toLowerCase());
        })
      )
      .filter((product) => {
        if (!searchLower) return true;
        return (
          product.name?.toLowerCase().includes(searchLower) ||
          product.price?.toString().includes(searchLower) ||
          product.type?.toLowerCase().includes(searchLower) ||
          getSupplierName(product.supplierId).toLowerCase().includes(searchLower)
        );
      })
      .map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        type: product.type,
        supplier: getSupplierName(product.supplierId),
      }));
  };

  const columns = useMemo(
    () => [
      { field: 'name', headerName: 'Product Name', width: 250 },
      { field: 'price', headerName: 'Price', width: 250 },
      { field: 'type', headerName: 'Type', width: 250 },
      { field: 'supplier', headerName: 'Supplier', width: 250 },
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
  );

  return (
    <CustomDataGrid
      data={productsData}
      filters={filters}
      search={search}
      getFilteredRows={getFilteredRows}
      columns={columns}
      isLoading={isLoading}
      height={700}
      pageSize={5}
    />
  );
};

export default ProductsDataGrid;
