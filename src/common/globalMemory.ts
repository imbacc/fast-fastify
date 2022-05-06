import type { api_DTYPE, skip_DTYPE, base_DTYPE, cacheSql_DTYPE, apiCache_DTYPE, apiLimit_DTYPE, globalMemory_DTYPE } from '#/globalMemory'
import type { exec_DTYPE } from '#/exex'
import type { redis_DTYPE } from '#/redis'
import type { FastifyInstance } from 'fastify'

import md5 from '@/common/MD5'

class globalMemoryImpl implements globalMemory_DTYPE {
  /**
   * api内存接口限流
   */
  public api: api_DTYPE = new apiImpl()
  /**
   * 权限类
   */
  public skip: skip_DTYPE = new skipImpl()
  /**
   * base64加密和解密
   */
  public base: base_DTYPE = new baseImpl()
  /**
   * 缓存简单的请求sql
   */
  public cacheSql!: cacheSql_DTYPE
  /**
   * fastify实例对象
   */
  public fastify!: FastifyInstance
  /**
   * exec实例对象
   */
  public exec!: exec_DTYPE
  /**
   * redis实例对象
   */
  public redis!: redis_DTYPE

  /**
   * 初始化fastify
   * @param fastify
   */
  initFastify(fastify: FastifyInstance) {
    this.fastify = fastify
  }

  /**
   * 初始化mysql
   * @param exec
   */
  initExec(exec: exec_DTYPE) {
    this.exec = exec
  }

  /**
   * 初始化redis
   * @param redis
   */
  initRedis(redis: redis_DTYPE) {
    this.redis = redis
    this.cacheSql = new cacheSqlImpl(this)
  }
}

class apiImpl implements api_DTYPE {
  public clear: number = 10000
  public cache: apiCache_DTYPE = {}
  public limit: apiLimit_DTYPE = {}

  getCache(key: keyof apiCache_DTYPE): any {
    return this.cache[key]
  }

  setCache(key: keyof apiCache_DTYPE, val: any) {
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

  getLimit(key: keyof apiLimit_DTYPE): [number, number] {
    return this.limit[key]
  }
}

class skipImpl implements skip_DTYPE {
  public skipAuth: Array<string> = []
  public vagueSkipAuth: Array<string> = []

  // 精确检查 路由不检测 jwt权限
  addSkip(skip: string | Array<string>) {
    if (typeof skip === 'string') {
      this.skipAuth.push(skip)
    } else {
      this.skipAuth.push(...skip)
    }
  }

  // 模糊检查 路由不检测 jwt权限
  addVagueSkip(skip: string | Array<string>) {
    if (typeof skip === 'string') {
      this.vagueSkipAuth.push(skip)
    } else {
      this.vagueSkipAuth.push(...skip)
    }
  }

  /**
   * 精确检查权限
   * @param skip 路由地址
   * @returns boolean
   */
  checkSkip(skip: string) {
    return this.skipAuth.includes(skip)
  }

  /**
   * 模糊检查权限
   * @param skip 路由地址
   * @returns boolean
   */
  vagueCheckSkip(skip: string) {
    return skip.indexOf(this.vagueSkipAuth.toString()) !== -1
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

class cacheSqlImpl implements cacheSql_DTYPE {
  private gloablSuper: globalMemoryImpl

  constructor(superClass: globalMemoryImpl) {
    this.gloablSuper = superClass
  }

  async cache(sql: string, val: any[], time: number) {
    const name = `sql_${md5(sql)}`
    const redisCache = await this.gloablSuper.redis.getRedis(name)
    if (redisCache) {
      // console.log('%c [ redisCache ]-153', 'font-size:14px; background:#41b883; color:#ffffff;', redisCache)
      return await redisCache
    }
    const res = await this.gloablSuper.exec.call(sql, val)
    if (res.code === 0) this.gloablSuper.redis.setRedis(name, res, time) //默认360分钟一个小时 60 * 60
    return await res
  }
}

const globalMemory = new globalMemoryImpl()
export { globalMemory }
