import React from "react"
import { TextField } from "@mui/material"
import { textFieldStyle } from "@/app/styles/SupplierFormStyles"

const CustomTextField = ({
  label,
  name,
  value,
  onChange,
  required = false,
  fullWidth = true,
  autoComplete = "",
  variant = "outlined",
  id,
  autoFocus = false,
  ...rest
}) => {
  return (
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      fullWidth={fullWidth}
      autoComplete={autoComplete}
      variant={variant}
      id={id || name}
      autoFocus={autoFocus}
      sx={textFieldStyle}
      {...rest}
    />
  )
}

export default CustomTextField;
