import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Pass 'user' object into query
  const createUser = await prisma.user.create({ data: user })
}