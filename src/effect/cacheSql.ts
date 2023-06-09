import md5 from 'imba-md5'
import { redis, exec } from '@/effect'

export class CacheSql {
  async cache(sql: string, val: any[], time = 60 * 60) {
    const name = `sql_${md5(sql)}`
    const redisCache = await redis.getRedis(name)
    if (redisCache) {
      return await redisCache
    }
    const res = await exec.call(sql, val)
    if (res.code === 0) redis.setRedis(name, res, time) // 默认360分钟一个小时 60 * 60
    return await res
  }
}
