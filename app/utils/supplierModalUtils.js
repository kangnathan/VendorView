export const toggleDeleteModal = (setModalState, state) => setModalState((prev) => ({ ...prev, isDeleteModalOpen: state }));
export const selectSupplier = (setModalState, supplierId) => setModalState((prev) => ({ ...prev, selectedSupplierId: supplierId }));
