import type { router_DTYPE } from '#/router/modules'

import { logger } from '@/effect'
import { TestDtypeService } from '@/service/testDtypeService.bak'

const testDtypeService = new TestDtypeService()
const add = testDtypeService.add()

// 用户模块路由
export default () => {
  const list: router_DTYPE = [
    {
      // 全局代理操作对象
      isProxy: true,
      limit: [10, 5], // 10秒/5次 访问限制
      skip: true, // 跳过权限检测
      swagger: {
        tags: ['appinfo'],
        summary: '我是appinfo - 默认简介 is_proxy: true代理当前js所有路由!',
        description: 'appinfo - 默认描述 is_proxy: true代理当前js所有路由!',
      },
    },
    {
      url: '/add',
      method: 'POST',
      swagger: {
        summary: '我是新增接口',
        description: '新增接口的描述啊啊啊啊!',
      },
      schema: {
        body: add.schema,
      },
      skip: true,
      handler: async (reque, reply) => {
        // const { text } = reque.body
        // const body = [text]
        // 或者
        const body = Object.values(reque.body as object)
        // const res = await exec.call(add_test, body)
        const res = await add.action(body)
        reply.send(res)
      },
    },
    {
      url: '/upp',
      method: 'POST',
      // sql: {
      //   update_test: testInfo.curd_updateById().getSql(),
      //   update_test2: testInfo.pickKey('text').curd_updateById().getSql(), // 根据id更新text属性
      // },
      swagger: {
        summary: '我是更新接口 【跳过权限检测开启】',
        description: '更新接口的描述啊啊啊啊!',
      },
      schema: {
        // body: testInfo.schema.allSchema(),
      },
      handler: async (reque, reply) => {
        // const { id, name, text } = reque.body
        // const body = [name, text, id]
        // const res = await exec.call(update_test, body)
        // reply.send(res)
        reply.send(reque.body)
      },
    },
    {
      url: '/upp2',
      method: 'POST',
      swagger: {
        summary: '我是更新接口的克隆版',
        description: '更新接口的克隆版的描述啊啊啊啊!',
      },
      schema: {
        // body: testInfo.schema.omitSchema('name'),
      },
      handler: async (reque, reply) => {
        // const { id, text } = reque.body
        // const body = [text, id]
        // const res = await exec.call(update_test2, body)
        // res.description = '我是更新接口的克隆版, 复用sql'
        // reply.send(res)
        reply.send(reque.body)
      },
    },
    {
      url: '/del',
      method: 'DELETE',
      // sql: {
      //   delete_test: testInfo.curd_deleteById().getSql(),
      // },
      swagger: {
        summary: '我是删除接口',
        description: '删除接口的描述啊啊啊啊!',
      },
      handler: async (reque, reply) => {
        // const res = await exec.call(delete_test, [reque.body.id])
        // reply.send(res)
        reply.send(reque.body)
      },
    },
    {
      url: '/sel',
      method: 'GET',
      // sql: {
      //   select_test: testInfo.select().getSql(),
      //   test_connect: testInfo.pickKey('id').select('limit 1').getSql(),
      // },
      swagger: {
        summary: '我是查询接口！ 从api -> appinfo -> swagger 设置summary,description 简介和描述!',
        description: '查询接口的描述啊啊啊啊!',
      },
      handler: async (_reque, reply) => {
        // const res = await exec.call(select_test)
        // reply.send(res)
        reply.send('api_testSel')
      },
    },
    {
      url: '/fff',
      method: 'GET',
      handler: async (_reque, reply) => {
        // 缓存到redis 60分钟 只GET请求缓存!
        // const res = await cacheSql.cache(select_test, [0], 60)
        // res.description = '设置了skip: true 老子跳过了权限检测！'
        // reply.send(res)
        reply.send('api_testFff')
      },
    },
    {
      url: '/ddd',
      method: 'GET',
      limit: [10, 3],
      // sql: {
      //   select: testInfo.curd_selectById().getSql(),
      //   select2: testInfo.omitKey('version').select('where id = ? and id > 0').getSql(),
      // },
      schema: {
        // querystring: testInfo.schema.pickSchema('id'),
      },
      handler: async (reque, reply) => {
        // const { id } = reque.query
        // const res1 = await exec.call(select, [id])
        // const res2 = await exec.call(select2, [id])
        // const res3 = await exec.call(select_test)
        // reply.send({ res1, res2, res3 })
        reply.send(reque.body)
      },
    },
    {
      url: '/ttt',
      method: 'POST',
      onRequest: (_reque, _reply, done) => {
        logger.info('得经过老子!')
        done()
      },
      handler: async (reque, reply) => {
        // const res = await exec.call(select_test, [0])
        // reply.send(reque.body, res)
        reply.send(reque.body)
      },
    },
    {
      url: '/cache/:id',
      method: 'GET',
      limit: [10, 5],
      // 路由选项文档 https://www.w3cschool.cn/fastify/fastify-ko5l35zk.html
      onRequest: (reque, reply, done) => {
        // 箭头函数会破坏this实列对象
        // 开启浏览器缓存 Cache-control 3600秒
        logger.info(`reque = ${reque}`)
        reply.header('Cache-control', 'max-age=3600')
        reply.header('Last-Modified', new Date().toUTCString())
        done()
      },
      onResponse(reque, reply, done) {
        // 该钩子总是在共享的 `onResponse` 钩子后被执行
        logger.info(`reque = ${reque}`)
        logger.info(`reply = ${reply}`)
        done()
      },
      preValidation(reque, reply, done) {
        // 该钩子总是在共享的 `preValidation` 钩子后被执行
        logger.info(`reque = ${reque}`)
        logger.info(`reply = ${reply}`)
        done()
      },
      preHandler(reque, reply, done) {
        // 该钩子总是在共享的 `preHandler` 钩子后被执行
        logger.info(`reque = ${reque}`)
        logger.info(`reply = ${reply}`)
        done()
      },
      preSerialization: (reque, reply, payload, done) => {
        // 该钩子总是在共享的 `preSerialization` 钩子后被执行
        logger.info(`reque = ${reque}`)
        logger.info(`reply = ${reply}`)
        done(null, payload)
      },
      handler: async (_reque, reply) => {
        // const res = await exec.call(select_test, [0])
        // reply.send(res)
        reply.send('api_testCache')
      },
    },
  ]

  return list
}
