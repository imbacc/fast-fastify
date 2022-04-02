import type { api_DTYPE, skip_DTYPE, base_DTYPE, cacheSql_DTYPE, apiCache_DTYPE, apiLimit_DTYPE, globalMemory_DTYPE } from '#/globalMemory'

import type { exec_DTYPE } from '#/exex'
import type { redis_DTYPE } from '#/redis'
import type { FastifyInstance } from 'fastify'

import md5 from '@/common/MD5'

class globalMemoryImpl implements globalMemory_DTYPE {
  public api: api_DTYPE = new apiImpl()
  public skip: skip_DTYPE = new skipImpl()
  public base: base_DTYPE = new baseImpl()
  public cacheSql: cacheSql_DTYPE = new cacheSqlImpl()
  public fastify!: FastifyInstance
  public exec!: exec_DTYPE
  public redis!: redis_DTYPE

  // fastify
  initFastify(fastify: FastifyInstance) {
    this.fastify = fastify
  }

  // mysql exec
  initExec(exec: exec_DTYPE) {
    this.exec = exec
  }

  // redis
  initRedis(redis: redis_DTYPE) {
    this.redis = redis
  }
}

class apiImpl implements api_DTYPE {
  public clear: number = 10000
  public cache: apiCache_DTYPE = {}
  public limit: apiLimit_DTYPE = {}

  async getCache(key: string): Promise<string> {
    return await this.cache[key]
  }

  setCache(key: string, val: any) {
    this.cache[key] = val
    // 去除过多的缓存信息 节约内存
    const cache = this.cache
    const num = this.clear
    const len = Object.keys(cache).length
    if (len > num) {
      const slice = Object.entries(cache).slice(num / 2, len)
      this.cache = Object.fromEntries(slice)
    }
    return true
  }
}

class skipImpl implements skip_DTYPE {
  skipAuth: string[] = []

  // 路由不检测 jwt权限
  addSkip(skip: Array<string>) {
    this.skipAuth.push(...skip)
    return this.skipAuth
  }

  checkSkip(skip: string) {
    return this.skipAuth.includes(skip)
  }

  vagueCheckSkip(skip: string) {
    return this.skipAuth.indexOf(skip) !== -1
  }
}

class baseImpl implements base_DTYPE {
  base64(str: string) {
    return Buffer.from(str).toString('base64')
  }

  base64Re(str: string) {
    return Buffer.from(str, 'base64').toString()
  }
}

class cacheSqlImpl extends globalMemoryImpl implements cacheSql_DTYPE {
  async cache(sql: string, val: any[], time: number) {
    const name = `sql_${md5(sql)}`
    const redisCache = await super.redis.getRedis(name)
    if (redisCache) return await redisCache
    const res = await super.exec.call(sql, val)
    if (res.code === 0) super.redis.setRedis(name, res, time) //默认360分钟一个小时 60 * 60
    return await res
  }
}

const globalMemory = new globalMemoryImpl()
export { globalMemory }
