const { foo, user } = require('../schema')
const { user: api } = require('../../common/api')

//用户模块路由
module.exports = (fastify) => {
  return [
    {
      ...api.upp,
      handler: async (reque, reply) => {
        fastify.exec.get_table('update', ['app_info', ['text'], 'where id = ?'], ['text', 1]).then((res) => {
          //只有内容跟数据库不一致 changedRows才会有效
          if (res.code === 1 && res.data.changedRows > 0) {
            reply.send(res)
          } else {
            res['data'] = null
            reply.send(res)
          }
        })
      }
    },
    {
      ...api.fff,
      handler: async (reque, reply) => {
        //缓存到redis 60分钟 只GET请求缓存!
        fastify.cache_sql('select * from app_info where id > ?', [0], 60, reque).then((res) => {
          reply.send(res)
        })
      }
    },
    {
      ...api.ddd,
      handler: async (reque, reply) => {
        fastify.exec.call('select * from app_info where id > ?', [0]).then((res) => {
          reply.send(res)
        })
      },
      schema: {
        query: foo
      }
    },
    {
      ...api.ttt,
      handler: async (reque, reply) => {
        fastify.exec.call('select * from app_info where id > ?', [0]).then((res) => {
          reply.send(reque.body)
        })
      },
      schema: {
        body: user
      }
    },
    {
      ...api.cache,
      handler: async (reque, reply) => {
        fastify.exec.call('select * from app_info where id > ?', [0]).then((res) => {
          reply.send(res)
        })
      }
    }
  ]
}
