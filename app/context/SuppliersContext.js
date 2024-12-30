'use client'
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { useRouter } from 'next/navigation'
import { handleRequest, fetchSuppliersData } from "../utils/supplierApiUtils"
import { toggleDeleteModal, selectSupplier } from "../utils/supplierModalUtils"
import supplierValidationInputs from "../utils/supplierValidationInputs"
import { useSnackbarContext } from "./SnackbarContext"

const SupplierContext = createContext()

export const SupplierProvider = ({ children }) => {
  const { showSnackbar } = useSnackbarContext()
  const [suppliersData, setSuppliersData] = useState([])
  const [error, setError] = useState(null)
  const [search, setSearch] = useState("")
  const [modalState, setModalState] = useState({ selectedSupplierId: null, isDeleteModalOpen: false })
  const [open, setOpen] = useState(false)
  const [filters, setFilters] = useState({
    name: '',
    email: '',
    phone: '',
    tin: '',
    location: '',
  })

  const applyFilters = (suppliers, filters) => {
    return suppliers.filter((supplier) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true
        return supplier[key]?.toString().toLowerCase().includes(value.toLowerCase())
      })
    })
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const router = useRouter()

  const getSupplierById = (supplierId) => suppliersData.find((supplier) => supplier.id === supplierId)

  const handleError = (message, errorType = "error") => {
    setError(message)
    showSnackbar(message, errorType)
  }

  const fetchSuppliers = useCallback(() => {
    fetchSuppliersData(setSuppliersData, showSnackbar)
  }, [showSnackbar])

  useEffect(() => {
    fetchSuppliers()
  }, [fetchSuppliers])

  const createSupplier = async (data) => {
    const validationError = supplierValidationInputs(data)
    if (validationError) {
      showSnackbar(validationError, "warning")
      return null
    }

    return handleRequest(
      "/api/suppliers",
      "POST",
      data,
      "Supplier created successfully!",
      (result) => {
        setSuppliersData((prev) => [...prev, result.supplier])
        router.push('/suppliers')
      },
      showSnackbar
    )
  }

  const updateSupplier = async (id, updatedData) => {
    const updatedPayload = {
      action: 'update',
      ...updatedData,
    }

    return handleRequest(
      `/api/suppliers/${id}`,
      "PUT",
      updatedPayload,
      "Supplier updated successfully!",
      (result) => {
        setSuppliersData((prev) =>
          prev.map((supplier) =>
            supplier.id === id ? { ...supplier, ...updatedData } : supplier
          )
        )
      },
      showSnackbar
    )
  }

  const deleteSupplier = async (id) => {
    if (!id) {
      handleError("Invalid supplier ID")
      return null
    }

    return handleRequest(
      `/api/suppliers/${id}`,
      "PUT",
      { action: "delete" },
      "Supplier deleted successfully!",
      () => {
        setSuppliersData((prev) =>
          prev.map((supplier) => (supplier.id === id ? { ...supplier, isDeleted: true } : supplier))
        )
        router.push('/suppliers')
      },
      showSnackbar
    )
  }

  return (
    <SupplierContext.Provider
      value={{
        fetchSuppliers,
        suppliersData,
        error,
        search,
        setSearch,
        createSupplier,
        updateSupplier,
        deleteSupplier,
        modalState,
        selectSupplier: (id) => selectSupplier(setModalState, id),
        toggleDeleteModal: (state) => toggleDeleteModal(setModalState, state),
        getSupplierById,
        handleClose,
        handleOpen,
        open,
        filters,
        setFilters,
        applyFilters
      }}
    >
      {children}
    </SupplierContext.Provider>
  )
}

export const useSupplierContext = () => {
  const context = useContext(SupplierContext)
  if (!context) {
    throw new Error("useSupplierContext must be used within a SupplierProvider")
  }
  return context
}
