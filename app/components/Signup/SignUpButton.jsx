import { Box, Button, Link } from "@mui/material";

export default function SignUpButton() {
    return (
        <Box>
            <Button
                href="/home"
                variant="contained"
                sx={{
                marginTop: '5px',
                padding: '10px 25px 10px 25px',
                borderRadius: '10px',
                backgroundColor: '#A35422',
                fontFamily: 'poppins',
                fontWeight: 300,
                textTransform: 'none'
            }}>
                
                Register
            </Button>
        </Box>
    );
}
