const {
  listen: { port, ip },
  swagger: { use, route, info, host, tags, apiKey, externalDocs }
} = require('../config')

module.exports = (fastify) => {
  if (!use) return
  fastify.register(require('fastify-swagger'), {
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

  global.add_map([
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
}
