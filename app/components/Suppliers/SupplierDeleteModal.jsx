import { useSupplierContext } from "@/app/context/SuppliersContext";
import CustomDeleteModal from "../CustomDeleteModal";

const SupplierDeleteModal = () => {
  const {
    modalState: { isDeleteModalOpen, selectedSupplierId },
    toggleDeleteModal,
    deleteSupplier,
  } = useSupplierContext();

  return (
    <CustomDeleteModal
      isOpen={isDeleteModalOpen}
      onClose={() => toggleDeleteModal(false)}
      onDelete={() => deleteSupplier(selectedSupplierId)}
      title="Delete supplier with all its products?"
    />
  );
};

export default SupplierDeleteModal;
