import type { RouteOptions } from 'fastify'
import type { firstRouter_DTYPE, arrayRouter_DTYPE } from '#/router/modules'

import fs from 'node:fs'
import { fastify, apiLimitMemory, skipRouter, logger } from '@/effect'

const path = './src/router/modules'
async function fsModules() {
  const modules: Array<any> = []
  await fs.readdirSync(path).map(async (fileName) => {
    const res = await import(`./modules/${fileName}`)
    modules.push(res.default())
  })
  // modules.push(appinfo())
  // modules.push(token())
  return modules
}

export default async () => {
  const list = await fsModules()

  list.forEach((info) => {
    const first = info[0] as Partial<firstRouter_DTYPE>
    const filter = first?.isProxy ? Object.keys(first).filter((f) => f !== 'isProxy') : []

    // 代理和默认值设定
    info.slice(1).map((module: arrayRouter_DTYPE) => {
      if (first.isProxy) {
        filter.forEach((key) => {
          if (key === 'swagger' && first.swagger) {
            module.schema = Object.assign(module.schema || {}, first.swagger)
          } else if (key === 'prefix' && first.prefix) {
            module.url = first.prefix + module.url
          } else {
            module[key] = typeof first[key] !== 'undefined' ? first[key] : module[key]
          }
        })
      }
      // console.log('%c [ module ]-32', 'font-size:14px; background:#41b883; color:#ffffff;', JSON.stringify(module))
      if (module.limit && Array.isArray(module.limit)) {
        apiLimitMemory.setLimit(module.url, module.limit)
        delete module.limit
      }
      if (module.skip) {
        skipRouter.addSkip(module.url)
        delete module.skip
      }
      if (module.swagger) {
        module.schema = Object.assign(module.schema || {}, module.swagger)
        delete module.swagger
      }
      fastify.route(module as RouteOptions)
    })
  }) // 循环子模块路由配置 生产路由

  logger.start('use router auto import!')
}
