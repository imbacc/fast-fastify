import type { router_DTYPE } from '#/router/modules'
import type { FastifyRequest } from 'fastify/types/request'
import type { TestDtypeTarget_DTYPE } from '#/entity/testDtype'

import { logger, mysql, prisma } from '@/effect/index'
import { testDtypeTable, testDtypeSchema } from '@/entity/testDtype'
import { resultful } from '@/common/resultful'

const testDtypeTableCurdSql = testDtypeTable.getCurdAllSql()

  type requestBody_DTYPE = FastifyRequest<{
    Body: TestDtypeTarget_DTYPE
  }>
  type requestQuery_DTYPE = FastifyRequest<{
    Querystring: TestDtypeTarget_DTYPE
  }>
  type requestParams_DTYPE = FastifyRequest<{
    Params: TestDtypeTarget_DTYPE
  }>

export default () => {
  const list: router_DTYPE = [
    {
      // 全局代理操作对象
      isProxy: true,
      prefix: '/testDtype',
      limit: [10, 5], // 10秒/5次 访问限制
      swagger: {
        tags: ['testDtype'],
      },
    },
    {
      url: '/findAll',
      method: 'GET',
      swagger: {
        summary: '查询所有数据',
        description: '查询所有数据description!',
      },
      handler: async (request, reply) => {
        const res = await prisma.app_info.findMany()
        reply.send(resultful('SUCCESS', res))

        // const res = await mysql.call(testDtypeTableCurdSql.findAll)
        // reply.send(res)
      },
    },
    {
      url: '/findOne',
      method: 'GET',
      swagger: {
        summary: '根据ID查询单个数据',
        description: '根据ID查询单个数据description!',
      },
      schema: {
        querystring: testDtypeSchema.pickSchema('id'),
      },
      handler: async (request: requestQuery_DTYPE, reply) => {
        const res = await mysql.call(testDtypeTableCurdSql.findOne, [request.query.id])
        reply.send(res)
      },
    },
    {
      url: '/save',
      method: 'POST',
      limit: [5, 5],
      swagger: {
        summary: '新增一条数据',
        description: '新增一条数据description!',
      },
      schema: {
        body: testDtypeSchema.omitSchema('id'),
      },
      handler: async (request, reply) => {
        const res = await mysql.call(testDtypeTableCurdSql.save, mysql.getValues(request.body))
        reply.send(res)
      },
    },
    {
      url: '/delete',
      method: 'DELETE',
      limit: [5, 5],
      swagger: {
        summary: '删除一条数据',
        description: '删除一条数据description!',
      },
      schema: {
        body: testDtypeSchema.pickSchema('id'),
      },
      handler: async (request, reply) => {
        const res = await mysql.call(testDtypeTableCurdSql.delete, mysql.getValues(request.body))
        reply.send(res)
      },
    },
    {
      url: '/update',
      method: 'POST',
      limit: [5, 5],
      swagger: {
        summary: '更新一条数据',
        description: '更新一条数据description!',
      },
      schema: {
        body: testDtypeSchema.getSchema(),
      },
      handler: async (request, reply) => {
        const res = await mysql.call(testDtypeTableCurdSql.update, mysql.getValues(request.body, ['id']))
        reply.send(res)
      },
    },
    {
      url: '/count',
      method: 'GET',
      swagger: {
        summary: '统计数据',
        description: '统计数据description!',
      },
      handler: async (request, reply) => {
        const res = await mysql.call(testDtypeTableCurdSql.count)
        reply.send(res)
      },
    },
    {
      url: '/xxx/:id',
      method: 'GET',
      limit: [10, 5],
      handler: (request, reply) => {
        reply.send('xxx')
      },
      // 路由选项文档 https://www.w3cschool.cn/fastify/fastify-ko5l35zk.html
      onRequest: (request, reply, done) => {
        // 箭头函数会破坏this实列对象
        // 开启浏览器缓存 Cache-control 3600秒
        reply.header('Cache-control', 'max-age=3600')
        reply.header('Last-Modified', new Date().toUTCString())
        done()
      },
      onResponse(request, reply, done) {
        // 该钩子总是在共享的 onResponse 钩子后被执行
        done()
      },
      preValidation(request, reply, done) {
        // 该钩子总是在共享的 preValidation 钩子后被执行
        done()
      },
      preHandler(request, reply, done) {
        // 该钩子总是在共享的 preHandler 钩子后被执行
        done()
      },
      preSerialization: (request, reply, payload, done) => {
        // 该钩子总是在共享的 preSerialization 钩子后被执行
        done(null, payload)
      },
    },
  ]
  return list
}
