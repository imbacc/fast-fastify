import type { router_DTYPE } from '#/router/modules'
import type { request_DTYPE } from '#/global'
import type { testInfoTarget_DTYPE } from '#/entity/testInfo'

import { resultful } from '@/common/resultful'
import { logger, prisma } from '@/effect/index'
import { testInfoSchema } from '@/entity/testInfo'

export default () => {
  const list: router_DTYPE = [
    {
      // 全局代理操作对象
      isProxy: true,
      prefix: '/testInfo',
      limit: [10, 5], // 10秒/5次 访问限制
      swagger: {
        tags: ['testInfo'],
      },
    },
    {
      url: '/findAll',
      method: 'GET',
      swagger: {
        summary: '查询所有数据',
        description: '查询所有数据description!',
      },
      handler: async (request: request_DTYPE<testInfoTarget_DTYPE>, reply) => {
        const res = await prisma.test_info.findMany()
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
        querystring: testInfoSchema.pickSchema('id'),
      },
      handler: async (request: request_DTYPE<testInfoTarget_DTYPE>, reply) => {
        const res = await prisma.test_info.findUnique({ where: { id: request.query.id } })
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
        body: testInfoSchema.omitSchema('id'),
      },
      handler: async (request: request_DTYPE<testInfoTarget_DTYPE>, reply) => {
        const res = await prisma.test_info.create({ data: Object.assign({}, request.body) })
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
        body: testInfoSchema.pickSchema('id'),
      },
      handler: async (request: request_DTYPE<testInfoTarget_DTYPE>, reply) => {
        const res = await prisma.test_info.delete({ where: { id: request.body.id } })
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
        body: testInfoSchema.getSchema(),
      },
      handler: async (request: request_DTYPE<testInfoTarget_DTYPE>, reply) => {
        const res = await prisma.test_info.update({ where: { id: request.body.id }, data: Object.assign({}, request.body) })
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
      handler: async (request: request_DTYPE<testInfoTarget_DTYPE>, reply) => {
        const res = await prisma.test_info.count()
        reply.send(resultful('SUCCESS', res))
      },
    },
    {
      url: '/xxx/:id',
      method: 'GET',
      limit: [10, 5],
      handler: (request: request_DTYPE<testInfoTarget_DTYPE>, reply) => {
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
