import { globalMemory } from './globalMemory'
import fastifyCors from 'fastify-cors'

export default () => {
  const { fastify } = globalMemory
  console.log('开启中间件...')
  fastify.register(fastifyCors)
}
