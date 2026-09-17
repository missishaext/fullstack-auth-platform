import bcrypt from "bcrypt";
import prisma from "../config/prisma";
import jwt, { SignOptions } from "jsonwebtoken";

export const signupUser = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {

  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email.toLowerCase(),
    },
  });

  if (existingUser) {
    throw new Error("EMAIL_EXISTS");
  }

  const passwordHash = await bcrypt.hash(data.password, 12);

  const user = await prisma.user.create({
    data: {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.toLowerCase(),
      passwordHash,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return user;
};

export const signinUser = async (
  email: string,
  password: string
) => {

  const user = await prisma.user.findUnique({
    where: {
      email: email.toLowerCase()
    }
  });

  if (!user) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!isPasswordValid) {
    throw new Error("INVALID_CREDENTIALS");
  }

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error("JWT_SECRET_NOT_CONFIGURED");
}

const expiresIn = (
  process.env.JWT_EXPIRES_IN || "1d"
) as SignOptions["expiresIn"];

const token = jwt.sign(
  {
    userId: user.id,
    email: user.email,
    role: user.role
  },
  jwtSecret,
  {
    expiresIn
  }
);

  return {
    token,
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    }
  };
};
