import React from "react"
import { IconButton } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { useSupplierContext } from "@/app/context/SuppliersContext"

const SupplierDeleteIcon = ({ supplierId }) => {
  const { toggleDeleteModal, selectSupplier } = useSupplierContext()

  const handleClick = () => {
    selectSupplier(supplierId); 
    toggleDeleteModal(true);  
  };

  return (
    <IconButton onClick={handleClick}>
      <DeleteIcon />
    </IconButton>
  )
}

export default SupplierDeleteIcon
