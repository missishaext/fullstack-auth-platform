import { Response } from "express";
import { ZodError } from "zod";
import { AuthRequest } from "../middleware/auth.middleware";
import {countUsers,findUserProfileById, findUsers} from "../repositories/user.repository";

import { userListQuerySchema} from "../schemas/user.schema";

export const getProfile = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: {
          code: "UNAUTHORIZED",
          message: "Authentication required"
        }
      });
    }

    const user = await findUserProfileById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: {
          code: "USER_NOT_FOUND",
          message: "User not found"
        }
      });
    }

    return res.status(200).json({
      success: true,
      data: user
    });
  } catch (error: unknown) {
    console.error("Profile error:", error);

    return res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong"
      }
    });
  }
};

export const getUsers = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const query = userListQuerySchema.parse(
      req.query
    );

    const { page, limit, role, email, startDate, endDate} = query;
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_DATE_RANGE",
          message: "Start date cannot be after end date",
          fields: {
            startDate:
              "Start date cannot be after end date"
          }
        }
      });
    }

    const filters = { role, email,startDate, endDate};

    const [users, totalUsers] = await Promise.all([
      findUsers(page, limit, filters),
      countUsers(filters)
    ]);

    const totalPages = Math.ceil(
      totalUsers / limit
    );

    return res.status(200).json({
      success: true,
      data: {
        users,
        pagination: {
          page,
          limit,
          totalUsers,
          totalPages
        }
      }
    });
  } catch (error: unknown) {

    if (error instanceof ZodError) {
      const fields: Record<string, string> = {};

      error.issues.forEach((issue) => {
        const fieldName =
          issue.path[0]?.toString();

        if (fieldName && !fields[fieldName]) {
          fields[fieldName] = issue.message;
        }
      });

      return res.status(400).json({
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Query validation failed",
          fields
        }
      });
    }

    console.error("Users list error:", error);

    return res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong"
      }
    });
  }
};