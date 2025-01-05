'use client'
import CustomSnackbar from '../components/CustomSnackbar'
import { useState, useEffect } from 'react'
import { Container, Typography, Box, Card, IconButton } from '@mui/material'
import { useSupplierContext } from '../context/SuppliersContext'
import { useProductContext } from '../context/ProductsContext'
import Sidebar from '../components/Sidebar'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import { typographyStyles, cardStyle, cardContainerStyle, cardDetailsStyle, typographyLargeText, typographyNormalText } from '@/app/styles/HomePageStyles'
import EditModal from '../components/Home/EditModal'

export default function Suppliers() {
    const [userData, setUserData] = useState(null)
    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const { suppliersData } = useSupplierContext()
    const { productsData } = useProductContext()

    const updateUserData = async () => {
        try {
            const response = await fetch('/api/user')
            const data = await response.json()

            if (response.ok) {
                setUserData(data.user || { error: 'Unknown User' })
            } else {
                setUserData(null)
            }
        } catch (error) {
            setUserData(null)
        }
    }

    useEffect(() => {
        updateUserData() 
    }, [])

    const user = userData
    const activeProductsCount = productsData.filter(product => !product.isDeleted).length

    return (
        <Sidebar>
            <CustomSnackbar />
            <EditModal isOpen={open} onClose={handleClose} updateUserData={updateUserData} />
            <Container component="main" maxWidth="lg" sx={{ mt: 8 }}>
                <Typography variant="h4" sx={{ ...typographyStyles, marginBottom: '30px' }}>
                    Home
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'flex-start' }}>
                    <Card sx={cardStyle}>
                        <Typography variant="h5" sx={typographyLargeText}>
                            Welcome, {user?.name || 'Loading...'}
                        </Typography>
                        <IconButton onClick={handleOpen} sx={{ mt: -6 }}>
                            <EditRoundedIcon />
                        </IconButton>
                    </Card>

                    <Box sx={cardContainerStyle}>
                        <Card sx={cardDetailsStyle}>
                            <Typography variant="h6" sx={typographyNormalText}>
                                Total Suppliers: {suppliersData.length}
                            </Typography>
                        </Card>

                        <Card sx={cardDetailsStyle}>
                            <Typography variant="h6" sx={typographyNormalText}>
                                Total Products: {activeProductsCount}
                            </Typography>
                        </Card>
                    </Box>
                </Box>
            </Container>
        </Sidebar>
    )
}
