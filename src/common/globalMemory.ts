import type { exec_DTYPE } from '#/exex'
import type { redis_DTYPE } from '#/redis'
import type { FastifyInstance } from 'fastify'
import type { apiCache_DTYPE, apiLimit_DTYPE, skipAuth_DTYPE, globalMemory_DTYPE } from '#/globalMemory'

import md5 from '@/common/MD5'

class globalMemoryImpl implements globalMemory_DTYPE {
  public apiClear: number = 10000
  public apiCache: apiCache_DTYPE = {}
  public apiLimit: apiLimit_DTYPE = {}
  public skipAuth: skipAuth_DTYPE = new Map()
  public fastify!: FastifyInstance
  public exec!: exec_DTYPE
  public redis!: redis_DTYPE

  // fastify
  setFastify(fastify: FastifyInstance) {
    this.fastify = fastify
  }

  // mysql exec
  setExec(exec: exec_DTYPE) {
    this.exec = exec
  }

  // redis
  setRedis(redis: redis_DTYPE) {
    this.redis = redis
  }

  // 路由不检测 jwt权限
  addSkip(skip: Array<string>) {
    skip.forEach((key) => this.skipAuth.set(key, true))
    return this.skipAuth
  }

  async getCache(key: string): Promise<string> {
    return await this.apiCache[key]
  }

  setCache(key: string, val: any) {
    this.apiCache[key] = val
    // 去除过多的缓存信息 节约内存
    const cache = this.apiCache
    const num = this.apiClear
    const len = Object.keys(cache).length
    if (len > num) {
      const slice = Object.entries(cache).slice(num / 2, len)
      this.apiCache = Object.fromEntries(slice)
    }
    return true
  }

  base64(str: string) {
    return Buffer.from(str).toString('base64')
  }

  base64Re(str: string) {
    return Buffer.from(str, 'base64').toString()
  }

  async cacheSql(sql: string, val: any[], time: number) {
    const name = `sql_${md5(sql)}`
    const redisCache = await this.redis.getRedis(name)
    if (redisCache) return await redisCache
    const res = await this.exec.call(sql, val)
    if (res.code === 0) this.redis.setRedis(name, res, time) //默认360分钟一个小时 60 * 60
    return await res
  }
}

const globalMemory = new globalMemoryImpl()
export { globalMemory }
