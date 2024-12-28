 export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    backgroundColor: '#F1EDE3',
    borderRadius: '20px',
    padding: '20px 30px 30px 20px',
    width: '80%',
    maxWidth: '900px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 'auto',
  };

 export const inputStyles = {
    fontFamily: 'Poppins',
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
  };

 export const selectStyles = {
    fontFamily: 'Poppins',
    borderRadius: '16px',
    '& .MuiSelect-select': {
      borderRadius: '16px',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderRadius: '16px',
    },
  };

  export const menuItemStyles = {
    fontFamily: 'Poppins',
    '&:hover': {
      backgroundColor: '#A35422',
      color: 'white',
    },
  };