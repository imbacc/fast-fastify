const Redis = require('redis') //Redis驱动
const { redis } = require('@/common/config.js') //Redis配置

const redisCli = Redis.createClient(redis.port, redis.host)
redisCli.on('error', (err) => console.log('redis err=' + err))

const get_redis = async (key) => {
  const p = new Promise((resolve) => {
    redisCli.get(key, (err, res) => {
      try {
        res = JSON.parse(res)
      } catch (e) {}
      resolve(res)
    })
  })
  return await p.then((res) => res)
}

const set_redis = (key, value, time) => {
  redisCli.set(key, typeof value === 'object' ? JSON.stringify(value) : value)
  if (time) redisCli.expire(key, time)
}

// const has_redis = async (key, two) => {
//   const p = new Promise((resolve, reject) => redisCli.get(key, (err, res) => resolve(res === two)))
//   return await p.then((res) => res)
// }

module.exports = (fastify) => {
  fastify.decorate('get_redis', get_redis)
  fastify.decorate('set_redis', set_redis)
  // fastify.decorate('has_redis', has_redis)
}
