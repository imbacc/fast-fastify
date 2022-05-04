const fileName = __filename.split('\\').pop().replace('.js', '')

// 复用
const { api_testSel } = require('@/api/appinfo.js')

// api
const api = require('@/api/token.js')

// sql 复用user的sql
const { select_test } = api_testSel.sql

//版本模块路由
module.exports = (fastify) => {
  const { exec } = fastify
  return [
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
      ...api.api_token,
      handler: async (reque, reply) => {
        const { userid, id } = reque.query
        const token = fastify.jwt.sign({ userid, by: 'imbacc' }, { expiresIn: 60 * 60 * 1 })
        const res = await exec.call(select_test, [id])
        res.token = `Bearer ${token}`
        reply.send(res)
      }
    }
  ]
}
