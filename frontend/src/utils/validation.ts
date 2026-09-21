export const validateSignup = (data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  const errors: Record<string, string> = {};

  if (!data.firstName.trim()) {
    errors.firstName = "First Name is required";
  }

  if (!data.lastName.trim()) {
    errors.lastName = "Last Name is required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(data.email)) {
    errors.email = "Invalid Email";
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  if (!passwordRegex.test(data.password)) {
    errors.password =
      "Password must contain uppercase, lowercase, number and special character";
  }

  return errors;
};