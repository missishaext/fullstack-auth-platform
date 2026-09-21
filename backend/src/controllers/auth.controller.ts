import { Request, Response } from "express";
import { ZodError } from "zod";

import {signupUser,signinUser} from "../services/auth.service";

import {signupSchema,signinSchema} from "../schemas/auth.schema";

export const signup = async (
  req: Request,
  res: Response
) => {
  try {
    const validatedData = signupSchema.parse(req.body);

    const user = await signupUser(validatedData);

    return res.status(201).json({
      success: true,
      data: user
    });
  } catch (error: unknown) {
    // Duplicate email error
    if (
      error instanceof Error &&
      error.message === "EMAIL_EXISTS"
    ) {
      return res.status(409).json({
        success: false,
        error: {
          code: "EMAIL_EXISTS",
          message: "Email already exists"
        }
      });
    }

    // Input validation errors
    if (error instanceof ZodError) {
      const fields: Record<string, string> = {};

      error.issues.forEach((issue) => {
        const fieldName = issue.path[0]?.toString();

        if (fieldName && !fields[fieldName]) {
          fields[fieldName] = issue.message;
        }
      });

      return res.status(400).json({
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Validation failed",
          fields
        }
      });
    }

    // Unexpected error
    console.error("Signup error:", error);

    return res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong"
      }
    });
  }
};

export const signin = async (
  req: Request,
  res: Response
) => {
  try {
    const validatedData = signinSchema.parse(req.body);

    const result = await signinUser(
      validatedData.email,
      validatedData.password
    );

    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (error: unknown) {
    // Email ya password incorrect ho
    if (
      error instanceof Error &&
      error.message === "INVALID_CREDENTIALS"
    ) {
      return res.status(401).json({
        success: false,
        error: {
          code: "INVALID_CREDENTIALS",
          message: "Invalid email or password"
        }
      });
    }

    // Input validation errors
    if (error instanceof ZodError) {
      const fields: Record<string, string> = {};

      error.issues.forEach((issue) => {
        const fieldName = issue.path[0]?.toString();

        if (fieldName && !fields[fieldName]) {
          fields[fieldName] = issue.message;
        }
      });

      return res.status(400).json({
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Validation failed",
          fields
        }
      });
    }

    // Unexpected error
    console.error("Signin error:", error);

    return res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong"
      }
    });
  }
};