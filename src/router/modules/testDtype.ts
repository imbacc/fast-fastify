import type { router_DTYPE } from '#/router/modules'
import type { request_DTYPE } from '#/global'
import type { testDtypeTarget_DTYPE } from '#/entity/testDtype'

import { resultful } from '@/common/resultful'
import { logger, prisma } from '@/effect/index'
import { testDtypeSchema } from '@/entity/testDtype'

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
      handler: async (request: request_DTYPE<testDtypeTarget_DTYPE>, reply) => {
        const res = await prisma.test_dtype.findMany()
        reply.send(resultful('SUCCESS', res))
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
      handler: async (request: request_DTYPE<testDtypeTarget_DTYPE>, reply) => {
        const res = await prisma.test_dtype.findUnique({ where: { id: request.query.id } })
        reply.send(resultful('SUCCESS', res))
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
      handler: async (request: request_DTYPE<testDtypeTarget_DTYPE>, reply) => {
        const res = await prisma.test_dtype.create({ data: Object.assign({}, request.body) })
        reply.send(resultful('SUCCESS', res))
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
      handler: async (request: request_DTYPE<testDtypeTarget_DTYPE>, reply) => {
        const res = await prisma.test_dtype.delete({ where: { id: request.body.id } })
        reply.send(resultful('SUCCESS', res))
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
      handler: async (request: request_DTYPE<testDtypeTarget_DTYPE>, reply) => {
        const res = await prisma.test_dtype.update({ where: { id: request.body.id }, data: Object.assign({}, request.body) })
        reply.send(resultful('SUCCESS', res))
      },
    },
    {
      url: '/count',
      method: 'GET',
      swagger: {
        summary: '统计数据',
        description: '统计数据description!',
      },
      handler: async (request: request_DTYPE<testDtypeTarget_DTYPE>, reply) => {
        const res = await prisma.test_dtype.count()
        reply.send(resultful('SUCCESS', res))
      },
    },
    {
      url: '/xxx/:id',
      method: 'GET',
      limit: [10, 5],
      handler: (request: request_DTYPE<testDtypeTarget_DTYPE>, reply) => {
        reply.send(resultful('SUCCESS', 'xxx/:id'))
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
