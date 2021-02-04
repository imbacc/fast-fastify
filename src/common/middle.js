const cors = require('fastify-cors')

module.exports = (fastify) => {
  console.log('开启中间件...')
  fastify.register(cors, {
    // put your options here
  })
  // fastify.use(require('hide-powered-by')())
  // fastify.use(require('x-xss-protection')())
}
