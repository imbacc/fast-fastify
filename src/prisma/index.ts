import { PrismaClient, Prisma } from '@prisma/client'

export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn'],
})