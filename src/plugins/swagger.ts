import type { FastifyInstance } from 'fastify'

import { globalMemory } from '@/common/globalMemory'
import { listen, swagger } from '@/common/config'

import fastifySwagger from 'fastify-swagger'

const { port, ip } = listen
const { use, route, info, host, tags, apiKey, externalDocs } = swagger

export default (fastify: FastifyInstance, opts = {}, done: Function) => {
  if (!use) return
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
    },
    ...opts
  })

  globalMemory.addSkip([
    route,
    `${route}/json`,
    `${route}/static/index.html`,
    `${route}/static/swagger-ui.css`,
    `${route}/static/swagger-ui.css.map`,
    `${route}/static/swagger-ui-bundle.js`,
    `${route}/static/swagger-ui-bundle.js.map`,
    `${route}/static/swagger-ui-standalone-preset.js`,
    `${route}/static/swagger-ui-standalone-preset.js.map`,
    `${route}/static/favicon-16x16.png`,
    `${route}/static/favicon-32x32.png`
  ])

  setTimeout(() => console.log(`swagger服务已启动: http://${ip}:${port}${route}`))

  done()
}
