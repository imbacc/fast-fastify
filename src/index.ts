import { fastify, logger, scheduler } from '@/effect'
import { listenConfig } from '@/config'

// import '@/test/test1'
import intercept from '@/common/intercept'
import throws from '@/common/throw'
import plugin from '@/common/plugin'
import router from '@/router/index'

// import asd from '../rust-package/index'
// console.log('%c [ asd ]-11', 'font-size:14px; background:#41b883; color:#ffffff;', asd)

async function startServer() {
  console.time('启动时间')
  intercept() // 注册拦截器
  throws() // 注册抛异常
  await plugin() // 注册插件
  await router() // 注册路由

  // 启动服务 nodemon index
  fastify.listen({ port: listenConfig.port, host: listenConfig.ip }, (err) => {
    if (err) {
      logger.error(`server start error = ${err.message}`)
      throw err
    }
    scheduler?.start()
    console.timeEnd('启动时间')
    // logger.info(`路由树形结构:\n ${fastify.printRoutes()}`)
  })
}

startServer()
