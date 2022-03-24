import { globalMemory } from './globalMemory'
import fastifyCors from 'fastify-cors'

const { fastify } = globalMemory
export default () => {
  console.log('开启中间件...')
  fastify.register(fastifyCors)
}
