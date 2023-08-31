import fastifyFrame from 'fastify'

import { isDev } from '@/config/index'
import { ApiLimitMemory } from './apiLimitMemory'
import { SkipRouter } from './skipRouter'
import { Logger } from './fastifyLog'

const loggerConfig = {
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'yyyy-mm-dd HH:MM:ss',
      ignore: 'pid',
    },
  },
}

// fastify实例对象
export const fastify = fastifyFrame({
  // 30: 'info',
  // 40: 'warn',
  // 50: 'error',
  logger: isDev ? loggerConfig : {},
  bodyLimit: 524288,
  requestTimeout: 120,
})

// pino日志
export const logger = new Logger(fastify.log)

// api接口限流 内存版本
export const apiLimitMemory = new ApiLimitMemory()

// api接口限流 redis版本
// export const apiLimitRedis = new ApiLimitRedis()

// 路由权限验证是否跳过
export const skipRouter = new SkipRouter()

// base64加密和解密
// export const base64 = new Base64()

// 缓存简单的请求sql
// export const cacheSql = new CacheSql()

// mysql执行器实例对象
// export const mysql = new MysqlExecute()

// redis实例对象
// export const redis = new Redis()
