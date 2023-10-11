import { fastify, logger } from '@/effect/index'

export default () => {
  logger.start('use throw error!')

  // fastify.setNotFoundHandler((_request, reply) => {
  //   reply.code(404).send({
  //     statusCode: 404,
  //     error: 'Bad Request',
  //   })
  // })

  fastify.setErrorHandler((error, _request, reply) => {
    // error.validationContext 是 [body, params, querystring, headers] 之中的值
    if (error.validation) {
      const msg = Array.from(error.validation, ({ message }) => message).join(',')
      const str = `validation failed of the ${error.validationContext}! ${msg}`
      logger.info(`verify = ${str}`)
      reply.status(400).send(str)
    } else {
      logger.info(`error = ${error}`)
      reply.status(400).send(error)
    }
  })
}
