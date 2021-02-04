module.exports = (fastify) => {
  console.log('开启抛异常...')

  fastify.setNotFoundHandler((reque, reply) => {
    console.log('try 404...')
    // console.log(reque)
    // console.log(reply)
    reply.code(404).send({
      statusCode: 404,
      error: 'Bad Request'
    })
  })

  fastify.setErrorHandler((error, request, reply) => {
    // error.validationContext 是 [body, params, querystring, headers] 之中的值
    if (error.validation) {
      let msg = Array.from(error.validation, ({ message }) => message).join(',')
      let str = `validation failed of the ${error.validationContext}! ${msg}`
      console.log('try error...', str)
      reply.status(400).send(new Error(str))
    }
  })
}
