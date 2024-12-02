import { Box, Button, Link } from "@mui/material";
import AddBusinessRoundedIcon from '@mui/icons-material/AddBusinessRounded';

export default function SupplierCreate() {
    return (
        <Box>
            <Button variant="contained" sx={{
                marginTop: '5px',
                padding: '10px 25px 10px 25px',
                borderRadius: '10px',
                backgroundColor: '#A35422',
                fontFamily: 'poppins',
                fontWeight: 500
            }}>
                CREATE
            </Button>
        </Box>
    );
}
