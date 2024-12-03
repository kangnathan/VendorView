import { Box, Button, Link } from "@mui/material";

export default function SupplierDelete() {
    return (
        <Box>
            <Button variant="contained" sx={{
                marginTop: '5px',
                padding: '10px 29px 11px 25px',
                borderRadius: '10px',
                backgroundColor: '#A5463A',
                fontFamily: 'poppins',
                fontWeight: 500,
                marginRight: '20px'
            }}>
                DELETE
            </Button>
        </Box>
    );
}
