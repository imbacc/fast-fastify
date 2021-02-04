const { foo, user } = require('../schema')

//用户模块路由
module.exports = (fastify) => {
  return [
    {
      method: 'POST',
      url: '/login',
      handler: async (reque, reply) => {
        const { exec } = fastify
        exec.get_table('update', ['app_info', ['text'], 'where id = ?'], ['text', 1]).then((res) => {
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
      method: 'GET',
      url: '/fff',
      handler: (reque, reply) => {
        //缓存到redis 60分钟 只GET请求缓存!
        fastify.cache_sql('select * from app_info where id > ?', [0], 60, reque).then((res) => {
          reply.send(res)
        })
      }
    },
    {
      method: 'GET',
      url: '/ddd',
      handler: (reque, reply) => {
        fastify.exec.call('select * from app_info where id > ?', [0]).then((res) => {
          reply.send(res)
        })
      },
      schema: {
        query: foo
      }
    },
    {
      method: 'POST',
      url: '/ttt',
      handler: (reque, reply) => {
        reply.send(reque.body)
      },
      schema: {
        body: user
      }
    }
  ]
}
