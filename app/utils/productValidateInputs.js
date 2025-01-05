const validateProductInputs = (data) => {
  // 1. Check if all fields are provided
  const { name, price, type } = data;
  if (!name || !price || !type) {
    return "All fields are required.";
  }

  // 2. Validate name: only string and no special characters
  const namePattern = /^[a-zA-Z\s]+$/;
  if (!namePattern.test(name)) {
    return "Name must be a valid string with no special characters.";
  }

  // 3. Validate price: no special characters, only numbers and decimal point allowed
  const pricePattern = /^[0-9]+(\.[0-9]{1,2})?$/;
  if (!pricePattern.test(price)) {
    return "Price must be a valid number without special characters.";
  }

  // 4. Validate type: must be a string and no special characters
  const typePattern = /^[a-zA-Z\s]+$/;
  if (!typePattern.test(type)) {
    return "Type must be a valid string with no special characters.";
  }

  return null;
};

export default validateProductInputs