import { PrismaClient } from '@prisma/client';

declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined;
  }

// Initialize the Prisma Client or reuse the existing global instance
export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  // In non-production environments, store the Prisma Client in the global object
  globalThis.prisma = db;
}