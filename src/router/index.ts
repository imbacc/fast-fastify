import type { RouteOptions } from 'fastify'
import type { firstRouter_DTYPE, arrayRouter_DTYPE } from '#/router/modules'

import { readdirSync } from 'node:fs'
import { fastify, apiLimitRedis, skipRouter, logger } from '@/effect'

const path = './src/router/modules'
async function fsModules() {
  const modules: Array<any> = []
  const fileList = await readdirSync(path)

  for (const fileName of fileList) {
    const module = await import(`./modules/${fileName}`)
    modules.push(module.default())
  }
  return modules
}

export default async () => {
  console.time('路由加载')
  const list = await fsModules()
  console.timeEnd('路由加载')

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
          } else if (typeof first[key] !== 'undefined') {
            module[key] = first[key]
          }
        })
      }
      if (module.limit && Array.isArray(module.limit)) {
        apiLimitRedis.setLimit(module.url, module.limit)
        // delete module.limit
      }
      if (module.skip) {
        skipRouter.addSkip(module.url)
        // delete module.skip
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
