import type { FastifyInstance } from 'fastify'

import fastifyCors from 'fastify-cors'

export default (fastify: FastifyInstance) => {
  console.log('开启中间件...')
  fastify.register(fastifyCors)
}
