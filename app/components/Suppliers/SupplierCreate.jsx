import { Box, Button, Link } from "@mui/material";

export default function SupplierCreate() {
    return (
        <Box>
            <Button variant="contained" sx={{
                marginTop: '5px',
                padding: '10px 25px 10px 25px',
                borderRadius: '10px',
                backgroundColor: '#A35422',
                fontFamily: 'poppins',
                fontWeight: 500,
                marginRight: '20px'
            }}>
                CREATE
            </Button>
        </Box>
    );
}
