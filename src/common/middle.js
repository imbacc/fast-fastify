const fastifyCors = require('fastify-cors')

module.exports = (fastify) => {
  console.log('开启中间件...')
  fastify.register(fastifyCors)
}
