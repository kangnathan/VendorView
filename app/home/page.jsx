import { Container, Typography } from '@mui/material'
import Sidebar from '../components/Sidebar'
import "../page.module.css";

export default function Suppliers() {
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
                    Home
                </Typography>
            </Container>
        </Sidebar>
    )
}
