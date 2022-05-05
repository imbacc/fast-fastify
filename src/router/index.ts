// import fs from 'fs'
import { globalMemory } from '@/common/globalMemory'
import appinfo from '@/router/modules/appinfo'
import token from '@/router/modules/token'

// const path = './src/router/modules'
const fs_modules = () => {
  let modules: Array<any> = []
  // await fs.readdirSync(path).map(async (fileName) => {
  //   const res = await import(`./modules/${fileName}`)
  //   modules.push(res.default())
  // })
  modules.push(appinfo())
  modules.push(token())
  return modules
}

export default () => {
  const list = fs_modules()
  const fastify = globalMemory.fastify
  const limit = globalMemory.api.limit
  const skip = globalMemory.skip

  console.time('生产路由')
  list.forEach((info: Array<object>) => {
    let proxy: any = null
    let filter = info.filter((f: any) => {
      if (f.is_proxy) proxy = Object.assign({}, f)
      return !f.is_proxy
    })

    filter.map((module: any) => {
      if (proxy) {
        delete proxy.is_proxy
        for (const key in proxy) {
          if (key === 'swagger') {
            module.schema = { ...module.schema, ...proxy.swagger }
          } else {
            module[key] = proxy[key]
          }
        }
      }
      if (module.sql) delete module.sql
      if (module.limit && Array.isArray(module.limit)) {
        limit[module.url] = module.limit
        delete module.limit
      }
      if (module.skip) {
        skip.addSkip(module.url)
        delete module.skip
      }
      if (module.swagger) {
        module.schema = { ...module.schema, ...module.swagger }
        delete module.swagger
      }
      fastify.route(module)
      // console.log('%c [ module ]-53', 'font-size:14px; background:#41b883; color:#ffffff;', module)
    })
  }) //循环子模块路由配置 生产路由
  console.timeEnd('生产路由')
  // console.log(list) //打印所有路由
}
