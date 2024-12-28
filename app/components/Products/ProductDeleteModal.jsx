"use client"

import React from "react"
import { Box, Button, Modal, Typography } from "@mui/material"
import { useProductContext } from "@/app/context/ProductsContext"

const ProductDeleteModal = () => {
  const {
    modalState: { isDeleteModalOpen, selectedProductId },
    toggleDeleteModal,
    deleteProduct,
    setError,
  } = useProductContext()

  const handleConfirmDelete = async () => {
    if (!selectedProductId) {
      setError("Invalid product ID")
      return
    }

    const success = await deleteProduct(selectedProductId)

    if (success) {
      toggleDeleteModal(false)
    }
  }

  return (
    <Modal
      open={isDeleteModalOpen}
      onClose={() => toggleDeleteModal(false)}
      BackdropProps={{
        style: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 250,
          bgcolor: "#F1EDE3",
          p: 4,
          borderRadius: "20px",
        }}
      >
        <Typography
          id="delete-modal-title"
          variant="h6"
          component="h2"
          sx={{
            textAlign: "center",
            fontWeight: 700,
            fontFamily: "poppins",
          }}
        >
          Are you sure ?
        </Typography>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "space-evenly" }}>
          <Button
            variant="outlined"
            onClick={() => toggleDeleteModal(false)}
            sx={{
              mr: 2,
              fontWeight: "bold",
              fontFamily: "poppins",
              borderRadius: 1,
              p: "8px 25px",
              color: "black",
              borderColor: "black",
              "&:hover": { borderColor: "black", color: "black" },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmDelete}
            sx={{
              backgroundColor: "#A5463A",
              color: "white",
              borderRadius: 1,
              p: "8px 45px",
              fontWeight: 600,
              fontFamily: "poppins",
            }}
          >
            YES
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default ProductDeleteModal
