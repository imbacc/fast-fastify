// 获取module文件下子模块内容
const fs = require('fs')
const path = './src/router/modules'

const fs_modules = (fastify) => {
  let modules = []
  fs.readdirSync(path).map((fileName) => modules.push(require(`./modules/${fileName}`)(fastify)))
  return modules
}

module.exports = (fastify) => {
  const list = fs_modules(fastify)
  let limit = global.api_limit
  let jump = global.jump_auth

  console.time('生产路由')
  list.forEach((info) => {
    let proxy = false
    let filter = info.filter((f) => {
      if (f.is_proxy) proxy = f
      return !f.is_proxy
    })
    filter.map((module) => {
      if (module.sql) delete module.sql
      if (module.limit && Array.isArray(module.limit)) {
        limit[module.url] = module.limit
        delete module.limit
      }
      if (module.jump) {
        jump.set(module.url, true)
        delete module.jump
      }
      if (proxy) module.schema = { ...module.schema, ...proxy.swagger }
      fastify.route(module)
    })
  }) //循环子模块路由配置 生产路由
  console.timeEnd('生产路由')

  // console.log(list)	//打印所有路由
}
