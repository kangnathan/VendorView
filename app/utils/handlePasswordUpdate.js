import validateNewPassword from '@/app/utils/validateNewPassword';

export const handlePasswordUpdate = async (formData, showSnackbar, router) => {
  const result = validateNewPassword(formData);
  if (result) {
    showSnackbar(result, 'warning');
    return null;
  }

  const finalPassword = formData.newPassword;

  try {
    const response = await fetch('/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        oldPassword: formData.oldPassword,
        finalPassword,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      try {
        const logoutResponse = await fetch('/api/auth/logout', {
          method: 'POST',
        });
        if (logoutResponse.ok) {
          router.push('/');
        } else {
          console.error('Logout failed');
        }
      } catch (error) {
        console.error('Error during logout:', error);
      }
      showSnackbar('Password updated successfully!', 'success');
    } else {
      showSnackbar(data.error || data.message, 'warning');
    }
  } catch (error) {
    showSnackbar('An error occurred while updating the password.', 'warning');
  }
};
