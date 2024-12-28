import { IconButton } from "@mui/material"
import { useProductContext } from "@/app/context/ProductsContext"
import DeleteIcon from "@mui/icons-material/Delete"

const ProductDeleteIcon = ({ productId }) => {
  const { toggleDeleteModal, selectProduct } = useProductContext()

  const handleClick = () => {
    selectProduct(productId); 
    toggleDeleteModal(true); 
  }

  return (
    <IconButton onClick={handleClick}>
      <DeleteIcon />
    </IconButton>
  )
}

export default ProductDeleteIcon
