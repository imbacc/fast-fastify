import type { PinoLoggerOptions } from 'fastify/types/logger'

import fastifyFrame from 'fastify'
import { isDev } from '@/config/index'
import { ApiLimitMemory } from './apiLimitMemory'
import { SkipRouter } from './skipRouter'
import { Base64 } from './base64'
import { Logger } from './fastifyLog'
import { Scheduler } from './schedule'

const loggerConfig: PinoLoggerOptions = {
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'yyyy-mm-dd HH:MM:ss',
      ignore: 'pid',
    },
  },
  timestamp: () => `,"time":"T${new Date().toLocaleString('zh', { hour12: false, month: '2-digit', day: '2-digit', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'Asia/Shanghai' })}"`,
}

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
export const apiLimitMemory = new ApiLimitMemory()

// 路由权限验证是否跳过
export const skipRouter = new SkipRouter()

// base64加密和解密
export const base64 = new Base64()

// scheduler实例对象
export const scheduler = new Scheduler()
