const { uid, swagger } = require('@/common/schema/version')
const api = require('@/common/api/version')
const fileName = __filename.split('\\').pop().replace('.js', '')

//版本模块路由
module.exports = (fastify) => [
  {
    // 全局代理操作 当前js的每个路由 都会代理属性,对象,函数 (除了is_proxy属性外)
    is_proxy: true,
    swagger: {
      tags: [fileName],
      summary: '我是授权接口',
      description: '授权接口的描述啊啊啊啊!'
    }
  },
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
