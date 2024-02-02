// https://www.prisma.io/docs/orm/reference/prisma-client-reference#prismaclient

import { PrismaClient } from '@prisma/client'
import { redis } from '@/effect/index'

// prisma实例对象
export class Prisma extends PrismaClient {
  constructor() {
    super({
      log: ['query', 'warn', 'error'],
    })
  }

  async cache(key: string, data: any, time = 60 * 60) {
    const redisCache = await redis.getRedis(key)
    if (redisCache) return redisCache
    if (data) redis.setRedis(key, data, time) // 默认360分钟一个小时 60 * 60
  }
}