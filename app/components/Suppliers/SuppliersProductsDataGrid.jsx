'use client';
import React, { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { useProductContext } from '@/app/context/ProductsContext';
import { useSupplierContext } from '@/app/context/SuppliersContext';
import CustomDataGrid from '../CustomDataGrid';
import ProductDeleteIcon from '@/app/components/Products/ProductDeleteIcon';
import ProductEditIcon from '@/app/components/Products/ProductEditIcon';

const SuppliersProducts = () => {
  const { id } = useParams();
  const { search, filters } = useProductContext();
  const { suppliersData } = useSupplierContext();

  const supplier = useMemo(
    () => suppliersData.find((supplier) => supplier.id === Number(id)),
    [suppliersData, id]
  );

  const isLoading = !supplier || !supplier.products;

  const getFilteredRows = (data, filters, searchLower) => {
    return data
      ?.filter((product) => !product.isDeleted)
      .filter((product) => {
        return Object.entries(filters).every(([key, value]) => {
          if (!value) return true;
          const productValue = product[key];
          return productValue
            ?.toString()
            .toLowerCase()
            .includes(value.toLowerCase());
        });
      })
      .filter((product) => {
        if (!searchLower) return true;
        return (
          product.name?.toLowerCase().includes(searchLower) ||
          product.price?.toString().includes(searchLower) ||
          product.type?.toLowerCase().includes(searchLower)
        );
      })
      .map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        type: product.type,
      }));
  };

  const columns = useMemo(
    () => [
      { field: 'name', headerName: 'Name', width: 250 },
      { field: 'price', headerName: 'Price', width: 250 },
      { field: 'type', headerName: 'Type', width: 250 },
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
      data={supplier?.products || []}
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

export default SuppliersProducts;
