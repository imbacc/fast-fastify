import type { router_DTYPE } from '#/router'
import type { APIResultful_DTYPE } from '#/resultful'

import { METHOD } from '@/common/config'
import { globalMemory } from '@/common/globalMemory'
import testInfo from '@/entity/testInfo'

const testInfoDefaultSql = testInfo.getDefaultSql()
const testInfoDefaultSchema = testInfo.getDefaultSchema()

// sql生成语句最好放外面
const testInfoSql = {
  updateTest2: testInfo.pickKey('text').curd_updateById().getSql(),
  selectVersion: testInfo.omitKey('version').select('where id = ? and id > 0').getSql()
}

//用户模块路由
export default (): Array<router_DTYPE> => {
  const exec = globalMemory.exec
  const cacheSql = globalMemory.cacheSql
  return [
    {
      // 全局代理操作 当前js的每个路由 都会代理属性,对象,函数 (除了is_proxy属性外)
      is_proxy: true,
      // limit: [10, 1], //10秒/1次 访问限制
      // skip: true, // 跳过权限检测
      swagger: {
        tags: ['appinfo'],
        summary: '我是appinfo - 默认简介 is_proxy: true代理当前js所有路由!',
        description: 'appinfo - 默认描述 is_proxy: true代理当前js所有路由!'
      }
    },
    {
      url: '/add',
      method: METHOD.POST,
      swagger: {
        summary: '我是新增接口',
        description: '新增接口的描述啊啊啊啊!'
      },
      schema: {
        body: testInfo.schema.pickSchema('text')
      },
      handler: async (reque: any, reply: any) => {
        const { text } = reque.body
        // 或者
        // const body = Object.values(reque.body)
        const res = await exec.call(testInfoDefaultSql.crud_insertSql, ['name is test', text])
        reply.send(res)
      }
    },
    {
      url: '/upp',
      method: METHOD.POST,
      swagger: {
        summary: '我是更新接口 【跳过权限检测开启】',
        description: '更新接口的描述啊啊啊啊!'
      },
      schema: {
        body: testInfoDefaultSchema.all
      },
      handler: async (reque: any, reply: any) => {
        const { id, name, text } = reque.body
        const res = await exec.call(testInfoDefaultSql.curd_updateByIdSql, [name, text, id])
        reply.send(res)
      }
    },
    {
      url: '/upp2',
      method: METHOD.POST,
      swagger: {
        summary: '我是更新接口的克隆版',
        description: '更新接口的克隆版的描述啊啊啊啊!'
      },
      schema: {
        body: testInfo.schema.omitSchema('name')
      },
      handler: async (reque: any, reply: any) => {
        const { id, text } = reque.body
        const res = await exec.call(testInfoSql.updateTest2, [text, id])
        res.description = '我是更新接口的克隆版, 复用sql'
        reply.send(res)
      }
    },
    {
      url: '/del/:id',
      method: METHOD.DELETE,
      swagger: {
        summary: '我是删除接口',
        description: '删除接口的描述啊啊啊啊!'
      },
      schema: {
        params: testInfo.schema.pickSchema('id')
      },
      handler: async (reque: any, reply: any) => {
        console.log('reque', reque)
        const res = await exec.call(testInfoDefaultSql.curd_deleteByIdSql, [reque.params.id])
        reply.send(res)
      }
    },
    {
      url: '/sel',
      method: METHOD.GET,
      swagger: {
        summary: '我是查询接口！ 从api -> appinfo -> swagger 设置summary,description 简介和描述!',
        description: '查询接口的描述啊啊啊啊!'
      },
      handler: async (_reque: any, reply: any) => {
        const res = await exec.call(testInfoDefaultSql.crud_selectAllSql)
        reply.send(res)
      }
    },
    {
      url: '/fff',
      method: METHOD.GET,
      skip: true, // 跳过权限检测
      handler: async (reque: any, reply: any) => {
        //缓存到redis 60分钟 只GET请求缓存!
        const res = (await cacheSql.cache(testInfoDefaultSql.crud_selectAllSql, [0], 60, reque)) as APIResultful_DTYPE
        res.description = '设置了skip: true 老子跳过了权限检测！'
        reply.send(res)
      }
    },
    {
      url: '/ddd',
      method: METHOD.GET,
      limit: [10, 3],
      schema: {
        querystring: testInfo.schema.pickSchema('id')
      },
      handler: async (reque: any, reply: any) => {
        const { id } = reque.query
        const res1 = await exec.call(testInfoDefaultSql.curd_selectByIdSql, [id])
        const res2 = await exec.call(testInfoSql.selectVersion, [id])
        const res3 = await exec.call(testInfoDefaultSql.crud_selectAllSql)
        reply.send({ res1, res2, res3 })
      }
    },
    {
      url: '/ttt',
      method: METHOD.POST,
      onRequest: (_reque: any, _reply: any, done: Function) => {
        console.log('得经过老子!')
        done()
      },
      handler: async (reque: any, reply: any) => {
        const res = await exec.call(testInfoDefaultSql.crud_selectAllSql, [0])
        reply.send(reque.body, res)
      }
    },
    {
      url: '/cache/:id',
      method: METHOD.GET,
      limit: [10, 5],
      // 路由选项文档 https://www.w3cschool.cn/fastify/fastify-ko5l35zk.html
      onRequest: (reque: any, reply: any, done: Function) => {
        // 箭头函数会破坏this实列对象
        // 开启浏览器缓存 Cache-control 3600秒
        console.log('reque', reque)
        reply.header('Cache-control', 'max-age=3600')
        reply.header('Last-Modified', new Date().toUTCString())
        done()
      },
      onResponse: function (reque: any, reply: any, done: Function) {
        // 该钩子总是在共享的 `onResponse` 钩子后被执行
        console.log('reque', reque)
        console.log('reply', reply)
        done()
      },
      preValidation: function (reque: any, reply: any, done: Function) {
        // 该钩子总是在共享的 `preValidation` 钩子后被执行
        console.log('reque', reque)
        console.log('reply', reply)
        done()
      },
      preHandler: function (reque: any, reply: any, done: Function) {
        // 该钩子总是在共享的 `preHandler` 钩子后被执行
        console.log('reque', reque)
        console.log('reply', reply)
        done()
      },
      preSerialization: (reque: any, reply: any, payload: any, done: Function) => {
        // 该钩子总是在共享的 `preSerialization` 钩子后被执行
        console.log('reque', reque)
        console.log('reply', reply)
        done(null, payload)
      },
      handler: async (_reque: any, reply: any) => {
        const res = await exec.call(testInfoDefaultSql.crud_selectAllSql, [0])
        reply.send(res)
      }
    }
  ]
}
