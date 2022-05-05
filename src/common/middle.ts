import { globalMemory } from './globalMemory'
import fastifyCors from 'fastify-cors'

export default () => {
  console.log('开启中间件...')
  const fastify = globalMemory.fastify
  fastify.register(fastifyCors)
}
