import { Box, TextField } from "@mui/material"
import { textFieldStyles, inputProps } from '@/app/styles/SearchStyles'
import { useSupplierContext } from '@/app/context/SuppliersContext'
import { useCallback } from 'react'

export default function SupplierSearch() {
    const { setSearch } = useSupplierContext()

    const handleSearchChange = useCallback((e) => {
        setSearch(e.target.value);
    }, [setSearch])

    return (
        <Box sx={{ width: 500, maxWidth: '100%' }}>
            <TextField
                fullWidth
                placeholder="Search"
                variant="outlined"
                onChange={handleSearchChange}
                InputProps={inputProps}
                sx={textFieldStyles}
            />
        </Box>
    )
}
