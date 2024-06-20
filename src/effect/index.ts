import fastifyFrame from 'fastify'
// import { isDev } from '@/config/index'
// import { ApiLimitMemory } from './apiLimitMemory'
import { ApiLimitRedis } from './apiLimitRedis'
import { SkipRouter } from './skipRouter'
// import { Base64 } from './base64'
import { Logger } from './fastifyLog'
import { Redis } from './redis'
import { Scheduler } from './schedule'
import { Prisma } from './prisma'

// const loggerConfig: PinoLoggerOptions = {
//   transport: {
//     target: 'pino-pretty',
//     options: {
//       colorize: true,
//       translateTime: 'yyyy-mm-dd HH:MM:ss',
//       ignore: 'pid',
//     },
//   },
//   timestamp: () => `,"time":"T${new Date().toLocaleString('zh', { hour12: false, month: '2-digit', day: '2-digit', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'Asia/Shanghai' })}"`,
// }

// fastify实例对象
export const fastify = fastifyFrame({
  // 30: 'info',
  // 40: 'warn',
  // 50: 'error',
  // logger: isDev ? loggerConfig : {},
  logger: true,
  bodyLimit: 524288,
  requestTimeout: 120,
})

// pino日志
export const logger = new Logger(fastify.log)

// api接口限流 内存版本
// export const apiLimitMemory = new ApiLimitMemory()

// redis实例对象
export const redis = new Redis()

// api接口限流 redis版本
export const apiLimitRedis = new ApiLimitRedis()

// 路由权限验证是否跳过
export const skipRouter = new SkipRouter()

// scheduler实例对象
export const scheduler = new Scheduler()

// prisma实例对象
export const prisma = new Prisma()
