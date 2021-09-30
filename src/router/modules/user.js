const { foo, user } = require('@/schema/user')
const api = require('@/api/user')
const fileName = __filename.split('\\').pop().replace('.js', '')

//用户模块路由
module.exports = (fastify) => [
  {
    // 全局代理操作 当前js的每个路由 都会代理属性,对象,函数 (除了is_proxy属性外)
    is_proxy: true,
    // limit: [10, 1], //10秒/1次 访问限制
    // jump: true, // 跳过权限检测
    swagger: {
      tags: [fileName],
      summary: '我是用户接口 - 默认简介!',
      description: '用户接口 - 默认描述!'
    }
  },
  {
    ...api.add,
    handler: async (reque, reply) => {
      fastify.exec.get_table(...api.add.table).then((res) => {
        //只有内容跟数据库不一致 changedRows才会有效
        if (res.code === 1 && res.data.changedRows > 0) {
          reply.send(res)
        } else {
          // res.data = null
          reply.send(res)
        }
      })
    }
  },
  {
    ...api.upp,
    handler: async (reque, reply) => {
      fastify.exec.get_table(...api.upp.table).then((res) => {
        //只有内容跟数据库不一致 changedRows才会有效
        if (res.code === 1 && res.data.changedRows > 0) {
          reply.send(res)
        } else {
          // res.data = null
          reply.send(res)
        }
      })
    }
  },
  {
    ...api.upp2,
    handler: async (reque, reply) => {
      fastify.exec.get_table(...api.upp.table).then((res) => {
        reply.send({
          description: '我是更新接口的克隆版, 复用api.upp.table',
          res
        })
      })
    }
  },
  {
    ...api.del,
    handler: async (reque, reply) => {
      const table = [...api.del.table]
      table.push([reque.body.id])
      fastify.exec.get_table(...table).then((res) => {
        reply.send(res)
      })
    },
    schema: {
      body: {
        type: 'object',
        properties: {
          id: { type: 'number', description: '删除ID' }
        },
        required: ['id']
      }
    }
  },
  {
    ...api.sel,
    handler: async (reque, reply) => {
      fastify.exec.get_table(...api.sel.table).then((res) => {
        reply.send(res)
      })
    }
  },
  {
    ...api.fff,
    handler: async (reque, reply) => {
      //缓存到redis 60分钟 只GET请求缓存!
      fastify.cache_sql(api.ddd.sql, [0], 60, reque).then((res) => {
        reply.send(res)
      })
    }
  },
  {
    ...api.ddd,
    handler: async (reque, reply) => {
      fastify.exec.call(api.ddd.sql, [0]).then((res) => {
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
      fastify.exec.call(api.ddd.sql, [0]).then((res) => {
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
      fastify.exec.call(api.ddd.sql, [0]).then((res) => {
        reply.send(res)
      })
    },
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', description: '路由PATH参数ID' }
        },
        required: ['id']
      }
    }
  }
]
