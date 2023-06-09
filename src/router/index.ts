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

    // 代理和默认值设定
    info.slice(1).map((module: arrayRouter_DTYPE) => {
      if (first) {
        const filter = Object.keys(first).filter((f) => f !== 'isProxy')
        filter.forEach((key) => {
          if (key === 'swagger' && module.schema && first.swagger) {
            module.schema = { ...module.schema, ...first.swagger as any }
          } else {
            module[key] = typeof first[key] !== 'undefined' ? first[key] : module[key]
          }
        })
      }
      if (module.limit && Array.isArray(module.limit)) {
        apiLimitMemory.setLimit(module.url, module.limit)
        delete module.limit
      }
      if (module.skip) {
        skipRouter.addSkip(module.url)
        delete module.skip
      }
      if (module.swagger) {
        module.schema = { ...module.schema, ...module.swagger as any }
        delete module.swagger
      }
      fastify.route(module as RouteOptions)
    })
  }) // 循环子模块路由配置 生产路由

  logger.start('use router auto import!')
}
