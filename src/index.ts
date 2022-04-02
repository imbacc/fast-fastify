import fastifyFrame from 'fastify'
import moduleAlias from 'module-alias'
moduleAlias.addAliases({ '@': __dirname }) // 添加alias导向

import { appInfo } from '@/entity/appinfo'

const appinfo = new appInfo()
console.log('appinfo=', appinfo)
// appinfo.ddd('qqq')
appinfo.id = 1234
console.log('appinfo.id=', appinfo.id)
// 用于生成d.ts声明文件
// pnpm exec schemats generate -c mysql://root:root@localhost/test -t app_info -s schema -o interface_output.ts

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
globalMemory.setFastify(fastify)

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
