import { globalMemory } from './globalMemory'
import { jwtkey } from './config'
import fastifyJwt from 'fastify-jwt'
import swagger from '@/plugins/swagger'

const { fastify } = globalMemory
export default () => {
  // JWT令牌
  fastify.register(fastifyJwt, { secret: jwtkey })

  // Swagger
  fastify.register(swagger)
}
