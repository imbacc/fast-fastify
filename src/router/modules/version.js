const { uid } = require('../schema')
const { version: api } = require('../../common/api')

//版本模块路由
module.exports = (fastify) => [
  {
    ...api.version,
    handler: async (reque, reply) => {
      const { query } = reque
      const { jwt, exec } = fastify
      const token = jwt.sign({ uuid: query.uuid, by: 'imbacc' }, { expiresIn: 60 * 60 * 1 })
      exec.get_table('select', ['app_info', [], 'where id = ?'], [query.id]).then((res) => {
        res.token = token
        reply.send(res)
      })
    },
    schema: {
      query: uid
    }
  }
]
