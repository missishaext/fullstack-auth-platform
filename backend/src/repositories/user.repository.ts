import {Prisma,Role} from "@prisma/client";

import prisma from "../config/prisma";

const safeUserSelect = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  role: true,
  createdAt: true,
  updatedAt: true
};

export const findUserProfileById = async (userId: number) => {
  return prisma.user.findUnique({
    where: {
      id: userId
    },
    select: safeUserSelect
  });
};

export interface UserListFilters {
  role?: Role;
  email?: string;
  startDate?: string;
  endDate?: string;
}

const createUserWhere = (
  filters: UserListFilters
): Prisma.UserWhereInput => {
  const where: Prisma.UserWhereInput = {};

  if (filters.role) {
    where.role = filters.role;
  }

  if (filters.email) {
    where.email = {
      contains: filters.email
    };
  }

  if (filters.startDate || filters.endDate) {
    where.createdAt = {};

    if (filters.startDate) {
      where.createdAt.gte = new Date(
        `${filters.startDate}T00:00:00.000Z`
      );
    }

    if (filters.endDate) {
      where.createdAt.lte = new Date(
        `${filters.endDate}T23:59:59.999Z`
      );
    }
  }

  return where;
};

export const findUsers = async (
  page: number,
  limit: number,
  filters: UserListFilters
) => {
  const skip = (page - 1) * limit;
  const where = createUserWhere(filters);

  return prisma.user.findMany({
    where,
    skip,
    take: limit,
    orderBy: {
      createdAt: "desc"
    },
    select: safeUserSelect
  });
};

export const countUsers = async (
  filters: UserListFilters
) => {
  const where = createUserWhere(filters);

  return prisma.user.count({
    where
  });
};