import { Box, TextField, InputAdornment, Button } from "@mui/material";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

export default function SupplierSearch() {
    return (
        <Box sx={{ width: 500, maxWidth: '100%' }}>
            <TextField 
                fullWidth 
                placeholder="Search"
                id="fullWidth" 
                variant="outlined"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchRoundedIcon />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <Button variant="contained" sx={{
                                padding: '7px 13px',
                                borderRadius: '10px',
                                backgroundColor: '#A35422',
                                fontFamily: 'poppins',
                                fontWeight: 500,
                                fontSize: '11px'
                            }}>
                                Search
                            </Button>
                        </InputAdornment>
                    ),
                }}
                sx={{ 
                    fontFamily: 'poppins',
                    backgroundColor: '#F7F7F5',  // Background color
                    borderRadius: '16px',         // Rounded edges for the border
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '16px',    // Round the input's border
                        '& fieldset': {
                            borderColor: 'none',  // Default border color
                            borderWidth: '2px'
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#A35422',  // Focused border color
                        },
                        '&:hover fieldset': {
                            borderColor: '#A35422', // Disable hover effect
                        },
                    },
                    '& .MuiInputLabel-root': {
                        '&.Mui-focused': {
                            color: '#A35422',  // Focus label color
                        },
                    }
                }}
            />
        </Box>
    );
}
