import EditRoundedIcon from '@mui/icons-material/EditRounded'
import React from 'react'
import IconButton from '@mui/material/IconButton'
import { useRouter } from 'next/navigation'

const ProductEditIcon = ({ productId }) => {

const handleViewDetails = () => {
  window.open(`/products/product-edit-page/${productId}`, '_blank')
}

  return (
    <IconButton onClick={handleViewDetails}>
      <EditRoundedIcon />
    </IconButton>
  )
}

export default ProductEditIcon


