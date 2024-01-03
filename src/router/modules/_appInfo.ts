import type { router_DTYPE } from '#/router/modules'
import type { FastifyRequest } from 'fastify/types/request'
import type { AppInfoTarget_DTYPE } from '#/entity/appInfo'

import { mysql, prisma } from '@/effect/index'
import { appInfoTable, appInfoSchema } from '@/entity/appInfo'
import { resultful } from '@/common/resultful'

const appInfoTableCurdSql = appInfoTable.getCurdAllSql()

type requestBody_DTYPE = FastifyRequest<{
  Body: AppInfoTarget_DTYPE
}>
type requestQuery_DTYPE = FastifyRequest<{
  Querystring: AppInfoTarget_DTYPE
}>
type requestParams_DTYPE = FastifyRequest<{
  Params: AppInfoTarget_DTYPE
}>

export default () => {
  const list: router_DTYPE = [
    {
      // 全局代理操作对象
      isProxy: true,
      prefix: '/appInfo',
      skip: true,
      limit: [10, 5], // 10秒/5次 访问限制
      swagger: {
        tags: ['应用模块'],
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
        querystring: appInfoSchema.pickSchema('id'),
      },
      handler: async (request: requestQuery_DTYPE, reply) => {
        const res = await mysql.call(appInfoTableCurdSql.findOne, [request.query.id])
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
        body: appInfoSchema.omitSchema('id'),
      },
      handler: async (reque, reply) => {
        const res = await mysql.call(appInfoTableCurdSql.save, mysql.getValues(reque.body))
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
        body: appInfoSchema.pickSchema('id'),
      },
      handler: async (reque, reply) => {
        const res = await mysql.call(appInfoTableCurdSql.delete, mysql.getValues(reque.body))
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
        body: appInfoSchema.getSchema(),
      },
      handler: async (reque, reply) => {
        const res = await mysql.call(appInfoTableCurdSql.update, mysql.getValues(reque.body, ['id']))
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
        const res = await mysql.call(appInfoTableCurdSql.count)
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
