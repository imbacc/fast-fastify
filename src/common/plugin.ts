import { fastify } from '@/effect/index'
import { swaggerConfig, jwtKeyConfig } from '@/config/index'

import swagger from '@/plugins/swagger'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import schedule from '@fastify/schedule'

// fastify-elasticsearch
// @fastify/multipart
// fastify-sentry
// fastify-axios

export default async () => {
  await swagger()
  fastify.register(cors, { methods: ['GET', 'PUT', 'POST'] })
  fastify.register(jwt, { secret: jwtKeyConfig })
  fastify.register(schedule)
}
