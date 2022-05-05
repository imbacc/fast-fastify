import { globalMemory } from './globalMemory'
import { jwtkey } from './config'
import fastifyJwt from 'fastify-jwt'
import swagger from '@/plugins/swagger'

export default () => {
  const fastify = globalMemory.fastify
  // JWT令牌
  fastify.register(fastifyJwt, { secret: jwtkey })

  // Swagger fastify.register 好像是异步的，swagger显示有问题
  swagger(fastify, {}, () => {})
}
