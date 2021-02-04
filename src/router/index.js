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

  console.time('生产路由')
  list.forEach((info) => info.map((module) => fastify.route(module))) //循环子模块路由配置 生产路由
  console.timeEnd('生产路由')

  // console.log(list)	//打印所有路由
}
