const fileName = __filename.split('\\').pop().replace('.js', '')
// const schema = require('@/schema/user.js')

// api
const api = require('@/api/appinfo.js')

// sql
const { add_test } = api.api_testAdd.sql
const { update_test } = api.api_testUpp.sql
const { delete_test } = api.api_testDel.sql
const { select_test } = api.api_testSel.sql
const { select, select2 } = api.api_testDdd.sql

//用户模块路由
module.exports = () => {
  return [
    {
      // 全局代理操作 当前js的每个路由 都会代理属性,对象,函数 (除了is_proxy属性外)
      is_proxy: true,
      // limit: [10, 1], //10秒/1次 访问限制
      // skip: true, // 跳过权限检测
      swagger: {
        tags: [fileName],
        summary: '我是appinfo - 默认简介 is_proxy: true代理当前js所有路由!',
        description: 'appinfo - 默认描述 is_proxy: true代理当前js所有路由!'
      }
    },
    {
      ...api.api_testAdd,
      handler: async (reque, reply) => {
        const { text, version, os, ostext, linkurl } = reque.body
        const body = [text, version, os, ostext, linkurl]
        // 或者
        // const body = Object.values(reque.body)
        const res = await exec.call(add_test, body)
        reply.send(res)
      }
    },
    {
      ...api.api_testUpp,
      handler: async (reque, reply) => {
        const { id, text, version, os, ostext, linkurl } = reque.body
        const body = [text, version, os, ostext, linkurl, id]
        const res = await exec.call(update_test, body)
        reply.send(res)
      }
    },
    {
      ...api.api_testUpp2,
      handler: async (reque, reply) => {
        const { id, text, version, os, ostext, linkurl } = reque.body
        const body = [text, version, os, ostext, linkurl, id]
        const res = await exec.call(update_test, body)
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
        reply.send('设置了skip: true 老子跳过了权限检测！')
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
