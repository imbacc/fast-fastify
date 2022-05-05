import { globalMemory } from './globalMemory'

export default () => {
  console.log('开启抛异常...')
  const fastify = globalMemory.fastify

  fastify.setNotFoundHandler((request: any, reply: any) => {
    console.log('try 404...')
    if (request) {
    }
    // console.log('request', request)
    // console.log(reque)
    // console.log(reply)
    reply.code(404).send({
      statusCode: 404,
      error: 'Bad Request'
    })
  })

  fastify.setErrorHandler((error: any, request: any, reply: any) => {
    if (request) {
    }
    // error.validationContext 是 [body, params, querystring, headers] 之中的值
    // console.log('request', request)
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
