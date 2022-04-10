import type { exec_DTYPE } from '#/exex'
import type { redis_DTYPE } from '#/redis'
import type { FastifyInstance } from 'fastify'

export type apiCache_DTYPE = { [key in string]: any }
export type apiLimit_DTYPE = { [key in string]: [number, number] }
export interface api_DTYPE {
  // api接口键为N时回收内存
  clear: number | 10000
  // api接口缓存
  cache: apiCache_DTYPE // Record<string, any>
  // api限流设置 '路由名字':[每秒,次数]
  limit: apiLimit_DTYPE
  // 获取缓存
  getCache(key: keyof apiCache_DTYPE): any
  // 设置缓存
  setCache(key: string, val: any): boolean
  // 获取限流
  getLimit(key: keyof apiLimit_DTYPE): [number, number]
}

export interface skip_DTYPE {
  /**
   * 跳过精确路由地址集合
   */
  skipAuth: Array<string>

  /**
   * 跳过模糊路由地址集合
   */
  vagueSkipAuth: Array<string>
  /**
   * 添加精确路由地址集合
   * @param skip 路由地址字符串集合
   */
  addSkip(skip: string | Array<string>): void
  /**
   * 添加模糊路由地址集合
   * @param skip 路由地址字符串集合
   */
  addVagueSkip(skip: string | Array<string>): void
  /**
   * 检查精确路由地址权限
   */
  checkSkip(skip: string): boolean
  /**
   * 检查模糊路由地址权限
   */
  vagueCheckSkip(skip: string): boolean
}

export interface base_DTYPE {
  // base64加密
  base64(str: string): string
  // base64解密
  base64Re(str: string): string
}

export interface cacheSql_DTYPE {
  cache<T>(sql: string, val: Array<any>, time: number, reque: any): Promise<T>
}

export interface globalMemory_DTYPE {
  api: api_DTYPE
  skip: skip_DTYPE
  base: base_DTYPE
  cacheSql: cacheSql_DTYPE
  fastify: FastifyInstance
  exec: exec_DTYPE
  redis: redis_DTYPE
  initFastify(fastify: FastifyInstance): void
  initExec(exec: exec_DTYPE): void
  initRedis(redis: redis_DTYPE): void
}
