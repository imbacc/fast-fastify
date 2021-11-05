const fileName = __filename.split('\\').pop().replace('.js', '')

// api
const api = require('@/api/user.js')

// sql
const { add_test } = api.api_testAdd.sql
const { update_test } = api.api_testUpp.sql
const { delete_test } = api.api_testDel.sql
const { select_test } = api.api_testSel.sql
const { select, select2 } = api.api_testDdd.sql

//用户模块路由
module.exports = (fastify) => {
  const { exec } = fastify
  return [
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
      ...api.api_testSel,
      handler: async (reque, reply) => {
        const res = await exec.call(add_test)
        reply.send(res)
      }
    },
    {
      ...api.api_testUpp,
      handler: async (reque, reply) => {
        const res = await exec.call(update_test)
        reply.send(res)
      }
    },
    {
      ...api.api_testUpp2,
      handler: async (reque, reply) => {
        const res = await exec.call(update_test)
        res.description = '我是更新接口的克隆版, 复用sql'
        reply.send(res)
      }
    },
    {
      ...api.api_testDel,
      handler: async (reque, reply) => {
        const res = await exec.call(delete_test, [reque.body.id])
        reply.send(res)
      }
    },
    {
      ...api.api_testSel,
      handler: async (reque, reply) => {
        const res = await exec.call(select_test)
        reply.send(res)
      }
    },
    {
      ...api.api_testFff,
      handler: async (reque, reply) => {
        //缓存到redis 60分钟 只GET请求缓存!
        //const res = await fastify.cache_sql(select_test, [0], 60, reque)
        //reply.send(res)
      }
    },
    {
      ...api.api_testDdd,
      handler: async (reque, reply) => {
        const res = await exec.call(select_test)
        reply.send(res)
      }
    },
    {
      ...api.api_testTtt,
      handler: async (reque, reply) => {
        const res = await exec.call(select_test, [0])
        reply.send(reque.body)
      }
    },
    {
      ...api.api_testCache,
      handler: async (reque, reply) => {
        const res = await exec.call(select_test, [0])
        reply.send(res)
      }
    }
  ]
}
