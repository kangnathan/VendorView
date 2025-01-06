import React from 'react';
import { Box, Typography } from "@mui/material";
import CustomSubmitButton from '@/app/components/CustomSubmitButton';

const CustomHeader = ({ backHref }) => {
    return (
        <Box
            sx={{
                position: 'absolute',
                top: 16, 
                left: 20,
                right: 0,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                px: 3,
            }}
        >
            <CustomSubmitButton text="Back" href={backHref} />
            <Typography variant="h6" noWrap sx={{ fontSize: '24px', fontFamily: 'poppins', fontWeight: 800, right: 40 }}>
                Vendor<span style={{ color: '#A35422' }}>View</span>
            </Typography>
        </Box>
    );
};

export default CustomHeader;
