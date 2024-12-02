import { IconButton, Box } from '@mui/material';  // Correct import
import OpenInNewIcon from '@mui/icons-material/OpenInNew'; // This import is correct

export default function OpenInNew() {
    return (
        <Box>
            <IconButton>
                <OpenInNewIcon/>
            </IconButton>
        </Box>
    );
}
