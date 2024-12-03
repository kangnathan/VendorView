export const textFieldStyle = {
    fontFamily: 'poppins',
    backgroundColor: '#F7F7F5',
    borderRadius: '16px',
    '& .MuiOutlinedInput-root': {
        borderRadius: '16px',
        fontFamily: 'poppins',
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
        fontFamily: 'poppins',
        '&.Mui-focused': {
            color: '#A35422',
        },
    },
};

export const buttonStyle = {
    color: '#A35422',
    marginTop: '5px',
    marginBottom: '20px',
    padding: '10px 25px 10px 10px',
    borderRadius: '10px',
    backgroundColor: '#F1EDE3',
    fontFamily: 'poppins',
    fontWeight: 700,
    '&:hover': {
        backgroundColor: '#EFD5A4',
    },
};

export const sectionTitleStyle = {
    fontFamily: 'poppins',
    fontWeight: 600,
    fontSize: '30px',
};
