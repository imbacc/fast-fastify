import type { FastifyInstance } from 'fastify'

import fastifyJwt from 'fastify-jwt'
// import swagger from './plugins/swagger'
import { jwtkey } from './config'

export default (fastify: FastifyInstance) => {
  // JWT令牌
  fastify.register(fastifyJwt, { secret: jwtkey })

  // Swagger
  // require('./plugins/swagger')(fastify)
}
