//版本模块路由
module.exports = (fastify) => [
  {
    method: 'GET',
    url: '/version',
    handler: (reque, reply) => {
      const { query } = reque
      const { jwt, exec } = fastify
      const token = jwt.sign({ uuid: query.uuid, by: 'imbacc' }, { expiresIn: 60 * 60 * 1 })
      exec.get_table('select', ['app_info', [], 'where id = ?'], [query.id]).then((res) => {
        res.token = token
        reply.send(res)
      })
    },
    schema: {
      query: {
        type: 'object',
        properties: {
          id: { type: 'number', maxLength: 1, minimum: 1, maximum: 5 },
          uuid: { type: 'number', maxLength: 10 }
        },
        required: ['id', 'uuid']
      }
    }
  }
]
