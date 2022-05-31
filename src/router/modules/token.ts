import { METHOD } from '@/common/config'
import { globalMemory } from '@/common/globalMemory'
import testInfo from '@/entity/testInfo'
import global from '@/entity/global'

// sql生成语句最好放外面
const testInfoSql = {
  selectTest: testInfo.crud_selectAll().getSql()
}

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
      url: '/token',
      method: METHOD.GET,
      schema: {
        querystring: global.schema.pickSchema('userid')
      },
      handler: async (reque: any, reply: any) => {
        const { userid, id } = reque.query
        const token = globalMemory.fastify.jwt.sign({ userid, by: 'imbacc' }, { expiresIn: 60 * 60 * 1 })
        const res = await globalMemory.exec.call(testInfoSql.selectTest, [id])
        res.token = `Bearer ${token}`
        reply.send(res)
      }
    }
  ]
}
