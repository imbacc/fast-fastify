import type { APICode } from '@/common/resultful'

import { fastify, logger } from '@/effect/index'
import { resultfulError } from '@/common/resultful'
import { isDev } from '@/config/index'

export default () => {
  logger.start('use throw error!')

  // fastify.setNotFoundHandler((request, reply) => {
  //   reply.code(404).send({
  //     statusCode: 404,
  //     error: 'Bad Request',
  //   })
  // })

  let code: keyof APICode = 'FAIL'
  fastify.setErrorHandler((error, request, reply) => {
    // error.validationContext 是 [body, params, querystring, headers] 之中的值
    if (error.validation) {
      const msg = Array.from(error.validation, ({ message }) => message).join(',')
      const str = `validation failed of the ${error.validationContext}! ${msg}`
      logger.error(`verify = ${str}`)
      if (msg?.includes('must have required')) code = 'IS_NULL'
      if (msg?.includes('must be')) code = 'VAL_CODE'
      reply.status(400).send(resultfulError(code, msg))
    } else {
      logger.error(`error = ${error.message}`)
      code = 'API_ERROR'
      reply.status(400).send(resultfulError(code, isDev ? error.message : ''))
    }
  })
}
