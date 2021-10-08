const moduleAlias = require('module-alias')
const fastify = require('fastify')({
  logger: false
})

const {
  listen: { port, ip, queue }
} = require('./common/config.js')

// 添加alias导向
moduleAlias.addAliases({
  '@': __dirname
})

require('./common/decorate.js')(fastify) //注册装饰器
require('./common/intercept.js')(fastify) //注册拦截器
require('./common/throw.js')(fastify) //注册抛异常
require('./common/middle.js')(fastify) //注册中间件
require('./common/plugin.js')(fastify) //注册插件
require('./db/mysql.js')(fastify) //注册Mysql	不是fastify-mysql插件
require('./db/redis.js')(fastify) //注册Redis	不是fastify-redis插件
require('./router/index.js')(fastify) //注册路由

//启动服务	nodemon	index
fastify.listen(port, ip, queue, (err) => {
  if (err) {
    throw err
    fastify.close()
  }
  console.log(`服务指向IP: ${ip}`)
  console.log(`服务监听端口: ${port}`)
  console.log(`服务已启动: http://${ip}:${port}/`)
  // console.log(`路由树形结构:\n ${fastify.printRoutes()}`)
})
