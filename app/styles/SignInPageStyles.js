export const boxStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "90vh",
  padding: 1.4,
};

export const gridContainerStyles = {
  backgroundColor: "#F7F7F5",
  borderRadius: "18px",
  boxShadow: 3,
  padding: { xs: 5, sm: 8 },
  maxWidth: { xs: "75%", sm: "80%", md: "70%", lg: "60%", xl: "55%" },
};

export const headerStyles = {
  textAlign: "left",
  fontFamily: 'poppins',
  fontWeight: 800,
};

export const sharedTextFieldStyles = {
  fontFamily: 'poppins',
  width: '80%',
  '& .MuiInputLabel-root': {
    fontFamily: 'poppins',
    '&.Mui-focused': { color: 'black' },
  },
  '& .MuiInputBase-input': { fontFamily: 'poppins', fontSize: '15px' },
  '& .MuiInput-underline:after': { borderColor: '#A35422' },
};

export const signInTypographyStyles = {
  fontFamily: 'poppins',
  fontWeight: 700,
  fontSize: '40px',
};
