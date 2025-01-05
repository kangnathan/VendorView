const validateSignIn = (formData) => {
  const { email, password } = formData;

  if (!email || !password) {
    return { valid: false, message: 'All fields are required' };
  }

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) {
    return { valid: false, message: 'Invalid email format' };
  }

  return { valid: true };
}

export default validateSignIn
