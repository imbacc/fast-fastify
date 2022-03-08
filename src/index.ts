import type { FastifyInstance } from 'fastify'

import fastifyFrame from 'fastify'
import moduleAlias from 'module-alias'
moduleAlias.addAliases({ '@': __dirname }) // 添加alias导向

import { listen } from '@/common/config'
import decorate from '@/common/decorate'
import intercept from '@/common/intercept'
import throws from '@/common/throw'
import middle from '@/common/middle'
import plugin from '@/common/plugin'
import mysql from '@/db/mysql'
import redis from '@/db/redis'
import router from '@/router/index'

const fastify: FastifyInstance = fastifyFrame({ logger: false })
const { port, ip, queue } = listen
decorate(fastify) //注册装饰器
intercept(fastify) //注册拦截器
throws(fastify) //注册抛异常
middle(fastify) //注册中间件
plugin(fastify) //注册插件
mysql(fastify) //注册Mysql	不是fastify-mysql插件
redis(fastify) //注册Redis	不是fastify-redis插件
router(fastify) //注册路由

//启动服务	nodemon	index
fastify.listen(port, ip, queue, (err: Error) => {
  if (err) throw err
  console.log(`服务指向IP: ${ip}`)
  console.log(`服务监听端口: ${port}`)
  console.log(`服务已启动: http://${ip}:${port}/`)
  // console.log(`路由树形结构:\n ${fastify.printRoutes()}`)
})
