import { IconButton, Box } from '@mui/material'; 
import DeleteIcon from '@mui/icons-material/Delete';

export default function Delete() {
    return (
        <Box>
            <IconButton>
                <DeleteIcon/>
            </IconButton>
        </Box>
    )
}