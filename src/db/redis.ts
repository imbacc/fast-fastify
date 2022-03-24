import { redis_DTYPE } from '#/redis'

import { globalMemory } from '@/common/globalMemory'
import { redis } from '@/common/config' //Redis配置
import RedisDrive from 'redis' //Redis驱动

const redisCli = RedisDrive.createClient(redis.port, redis.host)
redisCli.on('error', (err: any) => console.log('redis err=' + err))

export class Redis implements redis_DTYPE {
  async getRedis(key: string) {
    const p = new Promise((resolve) => {
      redisCli.get(key, (err: any, res: any) => {
        try {
          res = JSON.parse(res)
        } catch (e) {}
        resolve(res)
      })
    })
    return await p.then((res) => res)
  }

  setRedis(key: string, value: any, time: number) {
    redisCli.set(key, typeof value === 'object' ? JSON.stringify(value) : value)
    if (time) redisCli.expire(key, time)
  }
}

const redisObj = new Redis()
export default () => {
  globalMemory.setRedis(redisObj)
}
