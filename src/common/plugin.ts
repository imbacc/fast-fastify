import { fastify } from '@/effect/index'
import { jwtKeyConfig } from '@/config/index'
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import swagger from '@/plugins/swagger'

export default async () => {
  // JWT令牌
  await fastify.register(fastifyCors)
  await fastify.register(fastifyJwt, { secret: jwtKeyConfig })
  await swagger()
}
