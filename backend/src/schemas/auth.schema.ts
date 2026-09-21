import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password must not exceed 128 characters")
  .regex(/[A-Z]/, "Password must contain one uppercase letter")
  .regex(/[a-z]/, "Password must contain one lowercase letter")
  .regex(/[0-9]/, "Password must contain one number")
  .regex(
    /[^A-Za-z0-9]/,
    "Password must contain one special character"
  );

const nameSchema = z
  .string()
  .trim()
  .min(1, "Name is required")
  .max(50, "Name must not exceed 50 characters");

export const signupSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Enter a valid email address")
    .max(254, "Email is too long"),

  password: passwordSchema,

  // Public signup se ADMIN create nahi hone denge
  role: z.literal("USER").optional()
});

export const signinSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Enter a valid email address")
    .max(254, "Email is too long"),

  password: z
    .string()
    .min(1, "Password is required")
    .max(128, "Password is too long")
});