const md5 = require('md5-node')

module.exports = (fastify) => {
  console.log('开启装饰器...') //只配置静态

  // fastify.child.send -> solo
  fastify.decorate('child', { send: 'solo' })

  // md5配置到全局
  fastify.decorate('md5', md5)

  // 缓存get请求 配置到全局
  fastify.decorate('cache_sql', (sql, val, time, reque) => {
    return fastify.exec.call(sql, val).then((res) => {
      const { headers, raw } = reque
      const onlyid = md5(headers.authorization) || ''
      if (res.code === 1) fastify.set_redis(`api_${md5(raw.url + onlyid)}`, res, time) //默认360分钟一个小时 60 * 60
      return res
    })
  })
}
