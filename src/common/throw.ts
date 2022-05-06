import { globalMemory } from './globalMemory'

export default () => {
  console.log('开启抛异常...')
  const fastify = globalMemory.fastify

  fastify.setNotFoundHandler((_request: any, reply: any) => {
    console.log('try 404...')
    reply.code(404).send({
      statusCode: 404,
      error: 'Bad Request'
    })
  })

  fastify.setErrorHandler((error: any, _request: any, reply: any) => {
    // error.validationContext 是 [body, params, querystring, headers] 之中的值
    if (error.validation) {
      let msg = Array.from(error.validation, ({ message }) => message).join(',')
      let str = `validation failed of the ${error.validationContext}! ${msg}`
      console.log('try error verify...', str)
      reply.status(400).send(new Error(str))
    } else {
      console.log('try error other...', error)
      reply.status(400).send(new Error(error))
    }
  })
}
