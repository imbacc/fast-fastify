import type { FastifyInstance } from 'fastify'

import { jwtkey } from './config'

import fastifyJwt from 'fastify-jwt'
import swagger from '@/plugins/swagger'

export default (fastify: FastifyInstance) => {
  // JWT令牌
  fastify.register(fastifyJwt, { secret: jwtkey })

  // Swagger
  fastify.register(swagger)
}
