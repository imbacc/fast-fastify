// api
import api from '@/api/appinfo'
import { globalMemory } from '@/common/globalMemory'

// sql
const { add_test } = api.api_testAdd.sql.add_test
const { update_test } = api.api_testUpp.sql
const { delete_test } = api.api_testDel.sql
const { select_test } = api.api_testSel.sql
const { select, select2 } = api.api_testDdd.sql

//用户模块路由
export default () => {
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
      ...api.api_testAdd,
      handler: async (reque: any, reply: any) => {
        const { text, version, os, ostext, linkurl } = reque.body
        const body = [text, version, os, ostext, linkurl]
        // 或者
        // const body = Object.values(reque.body)
        const res = await globalMemory.exec.call(add_test, body)
        reply.send(res)
      }
    },
    {
      ...api.api_testUpp,
      handler: async (reque: any, reply: any) => {
        const { id, text, version, os, ostext, linkurl } = reque.body
        const body = [text, version, os, ostext, linkurl, id]
        const res = await globalMemory.exec.call(update_test, body)
        reply.send(res)
      }
    },
    {
      ...api.api_testUpp2,
      handler: async (reque: any, reply: any) => {
        const { id, text, version, os, ostext, linkurl } = reque.body
        const body = [text, version, os, ostext, linkurl, id]
        const res = await globalMemory.exec.call(update_test, body)
        res.description = '我是更新接口的克隆版, 复用sql'
        reply.send(res)
      }
    },
    {
      ...api.api_testDel,
      handler: async (reque: any, reply: any) => {
        const res = await globalMemory.exec.call(delete_test, [reque.body.id])
        reply.send(res)
      }
    },
    {
      ...api.api_testSel,
      handler: async (_reque: any, reply: any) => {
        const res = await globalMemory.exec.call(select_test)
        reply.send(res)
      }
    },
    {
      ...api.api_testFff,
      handler: async (reque: any, reply: any) => {
        //缓存到redis 60分钟 只GET请求缓存!
        const res = await globalMemory.cacheSql.cache(select_test, [0], 60, reque)
        reply.send('设置了skip: true 老子跳过了权限检测！', res)
      }
    },
    {
      ...api.api_testDdd,
      handler: async (_reque: any, reply: any) => {
        const res1 = await globalMemory.exec.call(select)
        const res2 = await globalMemory.exec.call(select2)
        const res3 = await globalMemory.exec.call(select_test)
        reply.send({ res1, res2, res3 })
      }
    },
    {
      ...api.api_testTtt,
      handler: async (reque: any, reply: any) => {
        const res = await globalMemory.exec.call(select_test, [0])
        reply.send(reque.body, res)
      }
    },
    {
      ...api.api_testCache,
      handler: async (_reque: any, reply: any) => {
        const res = await globalMemory.exec.call(select_test, [0])
        reply.send(res)
      }
    }
  ]
}
