import { PrismaClient } from "@prisma/client";

// justification: globalThis extension to prevent multiple Prisma Client instances across HMR in Next.js
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
