import fastifyFrame from 'fastify'
import moduleAlias from 'module-alias'
moduleAlias.addAliases({ '@': __dirname }) // 添加alias导向

import test from '@/entity/testInfo'
// console.log('index.ts testInfo=', test)
// console.log('test.schema.entity.vo', test.schema.entity.vo)
// console.log('sql1=', test.crud_selectAll().getSql())
// console.log('sql2=', test.crud_insert().getSql())
// console.log('sql3=', test.curd_selectById().getSql())
// console.log('sql4=', test.curd_selectByPage().getSql())
// console.log('sql5=', test.clearKey().appendKey('text').select().getSql())
// console.log('sql6=', test.setSql('SELECT id,name,text FROM test_info').getSql())
// console.log('test.schema.allSchema=======', test.schema.allSchema())
// console.log(`test.schema.pickSchema=======`, test.schema.pickSchema('id'))
// console.log(`test.schema.omitSchema=======`, test.schema.omitSchema('id'))
// console.log('test.schema.appendSchemaVo', test.schema.appendSchemaVo(test.schema.entity.vo).allSchema())
// console.log('test.schema.appendSchemaVo2', test.schema.appendSchemaVo(test.schema.entity.vo.qqq).allSchema())
// console.log('test.schema.appendSchemaVo3', test.schema.appendSchemaVo([test.schema.entity.vo.qqq, test.schema.entity.vo.www]).allSchema())
console.log(
  'test.schema.appendSchemaVo4',
  test.schema.appendSchemaVo({ search: Object.assign(test.schema.entity.name, { desc: '搜索名称', n2: 10 }) }).allSchema()
)
// console.log(
//   'test.schema.appendSchemaVo5',
//   test.schema
//     .appendSchemaVo([
//       { search: Object.assign(test.schema.entity.name, { desc: '搜索名称', n2: 10 }) },
//       { bingo: Object.assign(test.schema.entity.id, { desc: '3倍暴击', n1: 3, n2: 3, type: 'dd', len: 3 }) }
//     ])
//     .allSchema()
// )
// console.log('test.entity', test.entity.id.schema)

import { globalMemory } from '@/common/globalMemory'
import { listen } from '@/common/config'
import intercept from '@/common/intercept'
import throws from '@/common/throw'
import middle from '@/common/middle'
import plugin from '@/common/plugin'
// import mysql from '@/db/mysql'
// import redis from '@/db/redis'
// import router from '@/router/index'

const { port, ip, queue } = listen
const fastify = fastifyFrame({ logger: false })
globalMemory.initFastify(fastify)

intercept() //注册拦截器
throws() //注册抛异常
middle() //注册中间件
plugin() //注册插件
// mysql() //注册Mysql	不是fastify-mysql插件
// redis() //注册Redis	不是fastify-redis插件
// router() //注册路由

//启动服务	nodemon	index
fastify.listen(port, ip, queue, (err: Error) => {
  if (err) throw err
  console.log(`服务指向IP: ${ip}`)
  console.log(`服务监听端口: ${port}`)
  console.log(`服务已启动: http://${ip}:${port}/`)
  // console.log(`路由树形结构:\n ${fastify.printRoutes()}`)
})
