import { fastify, skipRouter, logger } from '@/effect/index'
import { listenConfig, swaggerConfig } from '@/config/index'

import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'

const { port, ip } = listenConfig
const { use, route, info, host, tags, apiKey, externalDocs } = swaggerConfig

export default async () => {
  if (!use) return
  await fastify.register(fastifySwagger, {
    swagger: {
      info,
      host: host === 'auto' ? `${ip}:${port}` : host,
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      securityDefinitions: {
        apiKey,
      },
      tags,
      externalDocs,
      security: [
        {
          apiKey: [],
        },
      ],
    },
  })

  await fastify.register(fastifySwaggerUi, {
    routePrefix: route,
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false,
    },
    staticCSP: true,
    transformSpecificationClone: true,
  })

  skipRouter.addBlurSkip(route)

  logger.start('use swagger document!')
  logger.start(`swagger server url = http://${ip}:${port}${route}/static/index.html`)
}
