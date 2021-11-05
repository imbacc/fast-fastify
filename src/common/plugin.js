const fastifyJwt = require('fastify-jwt')
const { jwtkey } = require('./config.js')

module.exports = (fastify) => {
  // JWT令牌
  fastify.register(fastifyJwt, { secret: jwtkey })

  // Swagger
  require('./plugins/swagger')(fastify)
}
