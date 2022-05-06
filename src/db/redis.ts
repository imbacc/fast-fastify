import type { redis_DTYPE } from '#/redis'

import { globalMemory } from '@/common/globalMemory'
import { redis } from '@/common/config' //Redis配置
import { createClient } from 'redis' //Redis驱动
// redis[s]://[[username][:password]@][host][:port][/db-number]:
// url: 'redis://alice:foobared@awesome.redis.server:6380'
const redisClient = createClient({ url: `redis://${redis.host}:${redis.port}` })
redisClient.connect()
if (redis.password) {
  redisClient.auth({
    username: redis.username,
    password: redis.password
  })
}
// redisClient.disconnect()
redisClient.on('error', (err: any) => console.log('redis err=' + err))
redisClient.on('connect', () => console.log('Redis开启连接...'))

export class Redis implements redis_DTYPE {
  async getRedis(key: string) {
    let res: any = await redisClient.get(key)
    if (`${res}`.indexOf('[') !== -1) {
      try {
        res = JSON.parse(res)
      } catch (e) {}
    }
    return await res
  }

  setRedis(key: string, value: Object | string | number, time: number) {
    redisClient.set(key, typeof value === 'object' ? JSON.stringify(value) : value)
    if (time) redisClient.expire(key, time)
  }
}

const redisObj = new Redis()
export default () => {
  globalMemory.initRedis(redisObj)
}
