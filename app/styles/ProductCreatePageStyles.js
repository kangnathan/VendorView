// ProductCreatePageStyles.js
export const formControlStyle = {
  fontFamily: 'Poppins',
  backgroundColor: '#F7F7F5',
  borderRadius: '16px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '16px',
    fontFamily: 'Poppins',
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
    fontFamily: 'Poppins',
    '&.Mui-focused': {
      color: '#A35422',
    },
  },
};

export const selectStyle = {
  fontFamily: 'Poppins',
  borderRadius: '16px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '16px',
  },
  '& .MuiSelect-select': {
    borderRadius: '16px',
  },
  '& .MuiMenu-paper': {
    borderRadius: '16px',
  },
};

export const menuItemStyle = {
  fontFamily: 'Poppins',
  '&:hover': {
    backgroundColor: '#A35422',
    color: '#FFFFFF',
  },
  '&.Mui-selected': {
    backgroundColor: '#A35422 !important',
    color: '#FFFFFF',
  },
};

export const menuPaperStyle = {
  borderRadius: '16px',
  '& .MuiMenuItem-root': {
    fontFamily: 'Poppins',
    '&:hover': {
      backgroundColor: '#A35422',
      color: '#FFFFFF',
    },
  },
};
