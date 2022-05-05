import type { FastifyInstance } from 'fastify'

import { globalMemory } from '@/common/globalMemory'
import { listen, swagger } from '@/common/config'

import fastifySwagger from 'fastify-swagger'

const { port, ip } = listen
const { use, route, info, host, tags, apiKey, externalDocs } = swagger

export default (fastify: FastifyInstance, _opts = {}, done: Function) => {
  if (!use) return
  // https://github.com/fastify/fastify-swagger
  fastify.register(fastifySwagger, {
    routePrefix: route,
    exposeRoute: true,
    swagger: {
      info: info,
      host: host === 'auto' ? `${ip}:${port}` : host,
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      securityDefinitions: {
        apiKey: apiKey
      },
      tags: tags,
      externalDocs: externalDocs,
      security: [
        {
          apiKey: []
        }
      ]
    }
  })

  globalMemory.skip.addVagueSkip([route])

  setTimeout(() => console.log(`swagger服务已启动: http://${ip}:${port}${route}`))

  done()
}
