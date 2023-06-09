import { fastify } from '../effect'
import { jwtKeyConfig } from '../config'
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import swagger from '@/plugins/swagger'

export default async () => {
  // JWT令牌
  await fastify.register(fastifyCors)
  await fastify.register(fastifyJwt, { secret: jwtKeyConfig })
  await swagger()
}
