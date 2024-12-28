'use client'
import { Container, Typography, Button } from '@mui/material'
import Sidebar from '../components/Sidebar'
import "../page.module.css";
import React from 'react';

export default function Suppliers() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);    
    

    return (
        <Sidebar>
            <Container 
                disableGutters={true} 
                maxWidth={false} 
                sx={{
                    width: '93%', // Ensures the container occupies the full width
                    margin: '50px 0px 0px 50px'
                }}
            >
                <Typography sx={{ fontFamily: 'poppins', fontWeight: 600, fontSize: '30px'}}>
                    Security
                </Typography>

                


            </Container>
        </Sidebar>
    )
}
