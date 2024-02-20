import { redisConfig } from '@/config/index'
import { logger } from '@/effect/index'
import { createClient } from 'redis'

export class Redis {
  private redis = createClient({ url: `redis://${redisConfig.host}:${redisConfig.port}` })

  constructor() {
    // Redis驱动
    // redis[s]://[[username][:password]@][host][:port][/db-number]:
    // url: 'redis://alice:foobared@awesome.redis.server:6380'
    this.redis.on('error', (err) => {
      logger.error(`redis error = ${err.message}`)
      if (err.message?.indexOf('connect ECONNREFUSED') !== -1) {
        this.redis.disconnect()
      }
    })
    this.redis.on('connect', () => logger.start('use redis server!'))

    this.redis.connect()
    if (redisConfig.password) {
      this.redis.auth({
        username: redisConfig.username,
        password: redisConfig.password,
      })
    }
    // this.redis.disconnect()
  }

  async getRedis<T = any>(key: string) {
    return new Promise<T>((resolve) => {
      this.redis.get(key).then((res) => {
        if (`${res}`.includes('[')) {
          try {
            res = JSON.parse(res as string)
          } catch (error) {
            logger.error(`getRedis JSON.parse = ${error?.toString()}`)
          }
        }
        resolve(res as T)
      }).catch((err) => {
        logger.error(`redis error = ${err}`)
        resolve(false as any)
      })
    })
  }

  setRedis(key: string, value, time?: number) {
    try {
      this.redis.set(key, typeof value === 'object' ? JSON.stringify(value) : value)
    } catch (error) {
      logger.error(`setRedis JSON.stringify = ${error?.toString()}`)
    }
    if (time) this.redis.expire(key, time)
  }
}
