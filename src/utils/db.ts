import { PrismaClient } from '@prisma/client'
// Instantiate a single instance PrismaClient and save it on the globalThis object.
// Then we keep a check to only instantiate PrismaClient if it's not on the globalThis object otherwise use the same
// instance again if already present to prevent instantiating extra PrismaClient instances.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
