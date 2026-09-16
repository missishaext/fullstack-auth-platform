import { Response } from "express";
import prisma from "../config/prisma";
import { AuthRequest } from "../middleware/auth.middleware";

export const getProfile = async (
  req: AuthRequest,
  res: Response
) => {

  const user = await prisma.user.findUnique({
    where: {
      id: req.user?.userId
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true
    }
  });

  return res.json(user);
};

export const getUsers = async (
  req: AuthRequest,
  res: Response
) => {

  const users = await prisma.user.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true
    }
  });

  return res.json(users);
};