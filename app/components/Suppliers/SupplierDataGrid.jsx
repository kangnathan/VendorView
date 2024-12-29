'use client';
import React, { useMemo } from 'react';
import { useSupplierContext } from '@/app/context/SuppliersContext';
import CustomTypographyLink from '@/app/components/CustomTypographyLink';
import SupplierEditIcon from './SupplierEditIcon';
import SupplierDeleteIcon from './SupplierDeleteIcon';
import CustomDataGrid from '@/app/components/CustomDataGrid';

const SupplierDataGrid = () => {
  const { suppliersData, search, filters, applyFilters } = useSupplierContext();

  const getFilteredRows = (data, filters, searchLower) => {
    const matchesSearch = (value) => value?.trim().toLowerCase().includes(searchLower);

    return (
      applyFilters(data?.filter((supplier) => !supplier.isDeleted) || [], filters) || []
    )
      .filter((supplier) => {
        if (!searchLower) return true;
        return (
          matchesSearch(supplier.name) ||
          matchesSearch(supplier.email) ||
          matchesSearch(supplier.phone) ||
          matchesSearch(supplier.location) ||
          matchesSearch(supplier.tin)
        );
      })
      .map(({ id, name, email, phone, location, tin }) => ({
        id,
        name,
        email,
        phone,
        location,
        tin: tin || '',
      }));
  };

  const columns = useMemo(
    () => [
      {
        field: 'name',
        headerName: 'Supplier Name',
        width: 210,
        renderCell: (params) => (
          <CustomTypographyLink text={params.row.name} href={`/supplier-page/${params.row.id}`} color="black" />
        ),
      },
      { field: 'email', headerName: 'Email', width: 230 },
      { field: 'phone', headerName: 'Phone', width: 200 },
      { field: 'tin', headerName: 'TIN', width: 190 },
      { field: 'location', headerName: 'Location', width: 170 },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 150,
        renderCell: (params) => (
          <>
            <SupplierEditIcon supplierId={params.row.id} />
            <SupplierDeleteIcon supplierId={params.row.id} />
          </>
        ),
      },
    ],
    []
  );

  const isLoading = useMemo(() => !suppliersData || suppliersData.length === 0, [suppliersData]);

  return (
    <CustomDataGrid
      data={suppliersData}
      filters={filters}
      search={search}
      getFilteredRows={getFilteredRows}
      columns={columns}
      isLoading={isLoading}
    />
  );
};

export default SupplierDataGrid;
