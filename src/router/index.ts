// 获取module文件下子模块内容
import fs from 'fs'
import { globalMemory } from '@/common/globalMemory'
const { fastify } = globalMemory

const path = './src/router/modules'

const fs_modules = () => {
  let modules: Array<any> = []
  fs.readdirSync(path).map(async (fileName) => {
    const res = await import(`./modules/${fileName}`)
    modules.push(res)
  })
  return modules
}

export default () => {
  const list = fs_modules()
  console.log('list', list)
  let limit = globalMemory.apiLimit
  let skip = globalMemory.skipAuth

  console.time('生产路由')
  list.forEach((info) => {
    let proxy: any = false
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
        skip.set(module.url, true)
        delete module.skip
      }
      if (module.swagger) {
        module.schema = { ...module.schema, ...module.swagger }
        delete module.swagger
      }
      fastify.route(module)
    })
  }) //循环子模块路由配置 生产路由
  console.timeEnd('生产路由')
  // console.log(list) //打印所有路由
}
