import { Request, Response } from "express";
import {signupUser,signinUser} from "../services/auth.service";

import {signupSchema,signinSchema} from "../schemas/auth.schema";

export const signup = async (
  req: Request,
  res: Response
) => {
  try {

    const validatedData =
      signupSchema.parse(req.body);

    const user =
      await signupUser(validatedData);

    return res.status(201).json({
      success: true,
      data: user,
    });

  } catch (error: any) {

    if (error.message === "EMAIL_EXISTS") {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const signin = async (
  req: Request,
  res: Response
) => {
  try {

    const data = signinSchema.parse(req.body);

    const result = await signinUser(
      data.email,
      data.password
    );

    return res.status(200).json(result);

  } catch (error: any) {

    if (
      error.message === "INVALID_CREDENTIALS"
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};