// 复用
import appinfoAPI from '@/api/appinfo'
import tokenAPI from '@/api/token'

import { globalMemory } from '@/common/globalMemory'

// sql 复用user的sql
const { select_test } = appinfoAPI.api_testSel.sql

//版本模块路由
export default () => {
  return [
    {
      // 全局代理操作 当前的每个路由 都会代理属性,对象,函数 (除了is_proxy属性外)
      is_proxy: true,
      swagger: {
        tags: ['token'],
        summary: '我是授权接口',
        description: '授权接口的描述啊啊啊啊!'
      }
    },
    {
      ...tokenAPI.api_token,
      handler: async (reque: any, reply: any) => {
        const { userid, id } = reque.query
        const token = globalMemory.fastify.jwt.sign({ userid, by: 'imbacc' }, { expiresIn: 60 * 60 * 1 })
        const res = await globalMemory.exec.call(select_test, [id])
        res.token = `Bearer ${token}`
        reply.send(res)
      }
    }
  ]
}
