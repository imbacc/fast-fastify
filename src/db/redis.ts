import type { FastifyInstance } from 'fastify'

import Redis from 'redis' //Redis驱动
import { redis } from '@/common/config' //Redis配置

const redisCli = Redis.createClient(redis.port, redis.host)
redisCli.on('error', (err: any) => console.log('redis err=' + err))

const get_redis = async (key: string) => {
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

const set_redis = (key: string, value: any, time: number) => {
  redisCli.set(key, typeof value === 'object' ? JSON.stringify(value) : value)
  if (time) redisCli.expire(key, time)
}

// const has_redis = async (key, two) => {
//   const p = new Promise((resolve, reject) => redisCli.get(key, (err, res) => resolve(res === two)))
//   return await p.then((res) => res)
// }

export default (fastify: FastifyInstance) => {
  fastify.decorate('get_redis', get_redis)
  fastify.decorate('set_redis', set_redis)
  // fastify.decorate('has_redis', has_redis)
}
