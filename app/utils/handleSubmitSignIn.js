import validateSignIn from '@/app/utils/validateSignIn'

export const handleSubmitSignIn = async (formData, showSnackbar, router, setIsSubmitting) => {
  const { email, password } = formData;

  const validationResult = validateSignIn(formData)
  if (!validationResult.valid) {
    showSnackbar(validationResult.message, 'warning')
    return;
  }

  setIsSubmitting(true)

  try {
    const response = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    })

    const data = await response.json()

    if (response.ok) {
      router.push('/home')
      showSnackbar('Signed in successfully', 'success')
      
    } else {
      showSnackbar(data.error || 'An error occurred', 'warning')
    }
  } catch (error) {
    console.error('Signin failed:', error)
    showSnackbar('Something went wrong. Please try again later', 'warning')
  } finally {
    setIsSubmitting(false)
  }
}
