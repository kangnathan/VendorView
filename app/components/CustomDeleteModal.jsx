'use client'
import React, { useState } from "react"
import { Box, Button, Modal, Typography, CircularProgress } from "@mui/material";
import styles from "@/app/styles/CustomDeleteModalStyles"; 

const CustomDeleteModal = ({
  isOpen,
  onClose,
  onDelete,
  title = "Are you sure?",
  confirmButtonText = "YES",
  cancelButtonText = "Cancel",
}) => {
  const [isLoading, setIsLoading] = useState(false); 

  const handleConfirmDelete = async () => {
    setIsLoading(true); 
    const success = await onDelete(); 
    setIsLoading(false); 
    
    if (success) {
      onClose(); 
    }
  }

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      BackdropProps={styles.modalBackdropProps}
    >
      <Box sx={styles.modalBox}>
        <Typography id="delete-modal-title" variant="h6" component="h2" sx={styles.title}>
          {title}
        </Typography>
        <Box sx={styles.buttonContainer}>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={styles.cancelButton}
            disabled={isLoading} 
          >
            {cancelButtonText}
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmDelete}
            sx={styles.confirmButton}
            disabled={isLoading} 
          >
            {isLoading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : confirmButtonText} 
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default CustomDeleteModal;
