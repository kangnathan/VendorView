const supplierValidationInputs = (data) => {
  // 1. Check if all fields are provided
  const { name, tin, location, email, phone } = data;
  if (!name || !tin || !location || !email || !phone) {
    return "All fields are required.";
  }

  // 2. Validate name: only string and no special characters
  const namePattern = /^[a-zA-Z\s]+$/;
  if (!namePattern.test(name)) {
    return "Name must be a valid string with no special characters.";
  }

  // 3. Validate TIN: must be between 9-12 digits
  const tinPattern = /^\d{9,12}$/;
  if (!tinPattern.test(tin)) {
    return "TIN must contain between 9 and 12 digits.";
  }

  // 4. Validate location: must be a string
  if (typeof location !== "string") {
    return "Location must be a string.";
  }

  // 5. Validate email: must be a valid email format
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailPattern.test(email)) {
    return "Email must be a valid email address.";
  }

  // 6. Validate phone: must be integers and not exceed 12 digits
  const phonePattern = /^\d{1,12}$/;
  if (!phonePattern.test(phone)) {
    return "Phone must be a valid number and not exceed 12 digits.";
  }

  // If all validations pass, return null (no errors)
  return null;
};

export default supplierValidationInputs