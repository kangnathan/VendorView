import { Box, Button } from "@mui/material";


export default function CustomButton() {
    return (
        <Box>
            <Button variant="contained"
                sx={{
                marginTop: '5px',
                padding: '10px 25px 10px 25px',
                borderRadius: '10px',
                backgroundColor: '#A35422',
                fontFamily: 'poppins',
                fontWeight: 500
            }}>
                Custom
            </Button>
        </Box>
    );
}
