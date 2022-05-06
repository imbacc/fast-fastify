import type { APIResultful_DTYPE } from '#/resultful'

// api
import appinfoAPI from '@/api/appinfo'
import { globalMemory } from '@/common/globalMemory'

// sql
const { add_test } = appinfoAPI.api_testAdd.sql
const { update_test, update_test2 } = appinfoAPI.api_testUpp.sql
const { delete_test } = appinfoAPI.api_testDel.sql
const { select_test } = appinfoAPI.api_testSel.sql
const { select, select2 } = appinfoAPI.api_testDdd.sql

//用户模块路由
export default () => {
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
      ...appinfoAPI.api_testAdd,
      handler: async (reque: any, reply: any) => {
        const { text } = reque.body
        const body = [text]
        // 或者
        // const body = Object.values(reque.body)
        const res = await exec.call(add_test, body)
        reply.send(res)
      }
    },
    {
      ...appinfoAPI.api_testUpp,
      handler: async (reque: any, reply: any) => {
        const { id, name, text } = reque.body
        const body = [name, text, id]
        const res = await exec.call(update_test, body)
        reply.send(res)
      }
    },
    {
      ...appinfoAPI.api_testUpp2,
      handler: async (reque: any, reply: any) => {
        const { id, text } = reque.body
        const body = [text, id]
        const res = await exec.call(update_test2, body)
        res.description = '我是更新接口的克隆版, 复用sql'
        reply.send(res)
      }
    },
    {
      ...appinfoAPI.api_testDel,
      handler: async (reque: any, reply: any) => {
        const res = await exec.call(delete_test, [reque.body.id])
        reply.send(res)
      }
    },
    {
      ...appinfoAPI.api_testSel,
      handler: async (_reque: any, reply: any) => {
        const res = await exec.call(select_test)
        reply.send(res)
      }
    },
    {
      ...appinfoAPI.api_testFff,
      handler: async (reque: any, reply: any) => {
        //缓存到redis 60分钟 只GET请求缓存!
        const res = (await cacheSql.cache(select_test, [0], 60, reque)) as APIResultful_DTYPE
        res.description = '设置了skip: true 老子跳过了权限检测！'
        reply.send(res)
      }
    },
    {
      ...appinfoAPI.api_testDdd,
      handler: async (reque: any, reply: any) => {
        const { id } = reque.query
        const res1 = await exec.call(select, [id])
        const res2 = await exec.call(select2, [id])
        const res3 = await exec.call(select_test)
        reply.send({ res1, res2, res3 })
      }
    },
    {
      ...appinfoAPI.api_testTtt,
      handler: async (reque: any, reply: any) => {
        const res = await exec.call(select_test, [0])
        reply.send(reque.body, res)
      }
    },
    {
      ...appinfoAPI.api_testCache,
      handler: async (_reque: any, reply: any) => {
        const res = await exec.call(select_test, [0])
        reply.send(res)
      }
    }
  ]
}
