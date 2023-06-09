import type { router_DTYPE } from '#/router/modules'

// 复用
// import appinfoAPI from '@/api/appinfo'
// import global from '@/entity/global'

// sql 复用user的sql
// const { select_test } = appinfoAPI.api_testSel.sql

// 版本模块路由
export default () => {
  const list: router_DTYPE = [
    {
      // 全局代理操作
      isProxy: true,
      swagger: {
        tags: ['token'],
        summary: '我是授权接口',
        description: '授权接口的描述啊啊啊啊!',
      },
    },
    {
      url: '/token',
      method: 'GET',
      schema: {
        // querystring: global.schema.pickSchema('userid'),
      },
      handler: async (reque: any, reply: any) => {
        // const { userid, id } = reque.query
        // const token = fastify.jwt.sign({ userid, by: 'imbacc' }, { expiresIn: 60 * 60 * 1 })
        // const res = await exec.call(select_test, [id])
        // res.token = `Bearer ${token}`
        // reply.send(res)
        reply.send(reque.body)
      },
    },
  ]

  return list
}
