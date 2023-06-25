import { redisConfig } from '@/config'
import { logger } from '@/effect'
import { createClient } from 'redis'

export class Redis {
  private redis = createClient({ url: `redis://${redisConfig.host}:${redisConfig.port}` })

  constructor() {
    // Redis驱动
    // redis[s]://[[username][:password]@][host][:port][/db-number]:
    // url: 'redis://alice:foobared@awesome.redis.server:6380'
    this.redis.connect()
    if (redisConfig.password) {
      this.redis.auth({
        username: redisConfig.username,
        password: redisConfig.password,
      })
    }
    // this.redis.disconnect()
    this.redis.on('error', (err) => {
      logger.error(`redis error = ${err.message}`)
      if (err.message?.indexOf('connect ECONNREFUSED') !== -1) {
        this.redis.disconnect()
      }
    })
    this.redis.on('connect', () => logger.start('use redis server!'))
  }

  async getRedis<T = any>(key: string) {
    return new Promise<T>((resolve) => {
      this.redis.get(key).then((res) => {
        if (`${res}`.includes('[')) {
          try {
            res = JSON.parse(res as string)
          } catch (e) { }
        }
        resolve(res as unknown as T)
      }).catch((err) => {
        logger.error(`redis error = ${err}`)
        resolve(false as unknown as T)
      })
    })
  }

  setRedis(key: string, value, time?: number) {
    this.redis.set(key, typeof value === 'object' ? JSON.stringify(value) : value)
    if (time) this.redis.expire(key, time)
  }
}
