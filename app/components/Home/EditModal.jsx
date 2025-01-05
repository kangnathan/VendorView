'use client'
import React, { useState } from "react"
import { Box, Button, Modal, Typography, CircularProgress } from "@mui/material"
import styles from "@/app/styles/CustomDeleteModalStyles"
import CustomTextField from "../CustomTextField"
import CustomSubmitButton from "../CustomSubmitButton"
import { useSnackbarContext } from "@/app/context/SnackbarContext"

const EditModal = ({ isOpen, onClose, updateUserData }) => { 
  const { showSnackbar } = useSnackbarContext()

  const [formData, setFormData] = useState({ newName: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch("/api/user", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })

    const data = await response.json()

    if (!data.success) {
      showSnackbar("Name updated successfully", "success")
      setFormData({ newName: '' }) 
      updateUserData() 
      onClose()
    } else {
      showSnackbar('Name not updated', "warning")
    }
  }

  const handleModalClose = () => {
    setFormData({ newName: '' })
    onClose()  
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleModalClose}
      BackdropProps={styles.modalBackdropProps}
    >
      <Box sx={styles.modalBox}>
        <Typography sx={styles.title}>
          Edit Your Name
        </Typography>
        <CustomTextField
          label="New Name"
          onChange={handleChange}
          name="newName"
          value={formData.newName}
        />

        <CustomSubmitButton text="Close" onClick={handleModalClose} />

        <CustomSubmitButton text="Submit" onClick={handleSubmit} />

        <Box sx={styles.buttonContainer}></Box>
      </Box>
    </Modal>
  )
}

export default EditModal
