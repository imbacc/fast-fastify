type apiCache_DTYPE = { [key in string]: any }
type apiLimit_DTYPE = { [key in string]: [number, number] }
type jumpAuth_DTYPE = Map<string, any>
interface globalMemoryImpl {
  // api接口键为N时回收内存
  apiClear: number | 10000
  // api接口缓存
  apiCache: apiCache_DTYPE
  // api限流设置 '路由名字':[每秒,次数]
  apiLimit: Record<string, any>
  // // 跳过权限检测
  jumpAuth: jumpAuth_DTYPE
  // 添加跳过权限函数
  addJump: (jump: Array<string>) => jumpAuth_DTYPE
  // 获取缓存
  getCache: (key: keyof apiCache_DTYPE) => Promise<string>
  // 设置缓存
  setCache: (key: keyof apiCache_DTYPE, val: any) => boolean
  // base64加密
  base64: (str: string) => string
  // base64解密
  base64Re: (str: string) => string
}

class globalMemory implements globalMemoryImpl {
  apiClear = 10000
  apiCache = {}
  apiLimit = {}

  // 跳过权限检测
  jumpAuth = new Map()

  addJump(jump: Array<string>) {
    //  路由不检测 jwt权限
    jump.forEach((key) => this.jumpAuth.set(key, true))
    return this.jumpAuth
  }

  async getCache(key: string): Promise<string> {
    return await this.apiCache[key as keyof typeof obj]
  }

  setCache(key: string, val: any) {
    // global.apiCache[key] = val
    // // 去除过多的缓存信息 节约内存
    // const cache = global.apiCache
    // const num = global.apiClear
    // const len = Object.keys(cache).length
    // if (len > num) {
    //   const slice = Object.entries(cache).slice(num / 2, len)
    //   global.apiCache = Object.fromEntries(slice)
    // }
    return true
  }

  base64(str: string) {
    return Buffer.from(str).toString('base64')
  }

  base64Re(str: string) {
    return Buffer.from(str, 'base64').toString()
  }
}

// export const initGlobal = () => {
//   // 定义全局属性
//   global.base64 = (str: string) => Buffer.from(str).toString('base64')
//   global.base64Re = (str: string) => Buffer.from(str, 'base64').toString() //base64解密
//   global.apiClear = 10000
//   global.apiCache = {} // api接口缓存
//   global.apiLimit = {} // api限流设置 '路由名字':[每秒,次数]
//   global.jumpAuth = new Map() // 跳过权限检测
//   global.addJump = (jump = []) => {
//     //路由不检测 jwt权限
//     const map = global.jumpAuth
//     jump.forEach((key) => map.set(key, true))
//     return map
//   }

//   // 读取缓存
//   global.getCache = async (key: string) => await global.apiCache[key]
//   // 设置缓存
//   global.setCache = (key: string, val: any) => {
//     global.apiCache[key] = val
//     // 去除过多的缓存信息 节约内存
//     const cache = global.apiCache
//     const num = global.apiClear
//     const len = Object.keys(cache).length
//     if (len > num) {
//       const slice = Object.entries(cache).slice(num / 2, len)
//       global.apiCache = Object.fromEntries(slice)
//     }
//   }
// }
