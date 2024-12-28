export const toggleDeleteModal = (setModalState, state) => setModalState((prev) => ({ ...prev, isDeleteModalOpen: state }));
export const selectProduct = (setModalState, productId) => setModalState((prev) => ({ ...prev, selectedProductId: productId }));
