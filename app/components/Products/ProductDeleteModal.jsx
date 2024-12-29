import { useProductContext } from "@/app/context/ProductsContext"
import CustomDeleteModal from "../CustomDeleteModal"

const ProductDeleteModal = () => {
  const {
    modalState: { isDeleteModalOpen, selectedProductId },
    toggleDeleteModal,
    deleteProduct,
  } = useProductContext()

  return (
    <CustomDeleteModal
      isOpen={isDeleteModalOpen}
      onClose={() => toggleDeleteModal(false)}
      onDelete={() => deleteProduct(selectedProductId)}
      title="Are you sure you want to delete this product?"
    />
  )
}

export default ProductDeleteModal
