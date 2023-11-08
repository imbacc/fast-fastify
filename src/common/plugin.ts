import { fastify } from '@/effect/index'
import { jwtKeyConfig } from '@/config/index'

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
  await fastify.register(cors, { methods: ['GET', 'PUT', 'POST'] })
  await fastify.register(jwt, { secret: jwtKeyConfig })
  await fastify.register(schedule)
}
