import { InputAdornment } from "@mui/material"
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'

  export  const textFieldStyles = {
        fontFamily: 'poppins',
        backgroundColor: '#F7F7F5',
        borderRadius: '16px',
        '& .MuiOutlinedInput-root': {
            borderRadius: '16px',
            '& fieldset': {
                borderColor: 'none',
                borderWidth: '2px',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#A35422',
            },
            '&:hover fieldset': {
                borderColor: '#A35422',
            },
        },
        '& .MuiInputLabel-root': {
            '&.Mui-focused': {
                color: '#A35422',
            },
        },
    }

 export const inputProps = {
        startAdornment: (
            <InputAdornment position="start">
                <SearchRoundedIcon />
            </InputAdornment>
        ),
    }