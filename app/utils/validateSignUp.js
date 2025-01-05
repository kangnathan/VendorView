import prisma from "@/lib/prisma";

export async function validateSignup({ name, email, password }) {
  const errors = {};

  if (!name && !email && !password) {
    errors.general = "All fields are required";
    return errors;
  }

  const nameRegex = /^[a-zA-Z0-9]+$/;
  if (!name || name.trim().length < 3) {
    errors.name = "Name must be at least 3 characters long";
  } else if (!nameRegex.test(name)) {
    errors.name = "Name can only contain letters and numbers";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = "Please provide a valid email address";
  } else {
    try {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        errors.email = "This email is already in use";
      }
    } catch (error) {
      console.error("Error checking email in use:", error.message || error);
      errors.email = "Could not validate email. Please try again later";
    }
  }

  if (!password || password.length < 6) {
    errors.password = "Password must be at least 6 characters long";
  }

  return errors;
}
