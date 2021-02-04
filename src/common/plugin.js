const { jwtkey, swagger } = require('./config')
const fastifyJwt = require('fastify-jwt')

module.exports = (fastify) => {
  // JWT令牌
  fastify.register(fastifyJwt, { secret: jwtkey })

  // Swagger
  require('./plugins/swagger')(fastify)
}
