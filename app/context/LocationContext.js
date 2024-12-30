'use client'
import React, { createContext, useState, useCallback, useContext, useEffect, useMemo } from 'react'
import { useSupplierContext } from '@/app/context/SuppliersContext'

const LocationContext = createContext()

export const LocationProvider = ({ children }) => {
  const { suppliersData, fetchSuppliers } = useSupplierContext()
  const [clickedLocation, setClickedLocation] = useState(null)
  const [open, setOpen] = useState(false)

  const handleOpenSet = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])
  
  useEffect(() => {
    if (fetchSuppliers) fetchSuppliers()
  }, [fetchSuppliers])

  const handleMapClick = useCallback(({ lngLat: { lat, lng } }) => {
    setClickedLocation({ latitude: lat, longitude: lng })
  }, [])

  const clearClickedLocation = useCallback(() => setClickedLocation(null), [])

  const contextValue = useMemo(() => ({
    suppliers: suppliersData,
    clickedLocation,
    handleMapClick,
    open,
    handleClose,
    handleOpenSet,
    clearClickedLocation,
  }), [
    suppliersData,
    clickedLocation,
    handleMapClick,
    open,
    handleClose,
    handleOpenSet,
    clearClickedLocation,
  ])

  return (
    <LocationContext.Provider value={contextValue}>
      {children}
    </LocationContext.Provider>
  )
}

export const useLocationContext = () => useContext(LocationContext)
