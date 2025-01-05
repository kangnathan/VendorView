const validateNewPassword = (data) => {
    
    const { oldPassword, newPassword, confirmNewPassword } = data

    if (!oldPassword || !newPassword || !confirmNewPassword ) {
        return "All fields are required."
    }

    if (!oldPassword) {
      return 'Old password is required'
    }

    if (!newPassword) {
      return 'New password is required'
    } else if (newPassword.length < 8) {
      return 'New password must be at least 8 characters'
    }

    if (!confirmNewPassword) {
      return 'Confirm new password is required';
    } else if (confirmNewPassword !== newPassword) {
      return 'Passwords do not match';
    }
}

export default validateNewPassword