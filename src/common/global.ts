export const initGlobal = () => {
  // 定义全局属性
  global.base64 = (str: string) => Buffer.from(str).toString('base64') //base64加密
  global.base64Re = (str: string) => Buffer.from(str, 'base64').toString() //base64解密
  global.apiClear = 10000
  global.apiCache = {} // api接口缓存
  global.apiLimit = {} // api限流设置 '路由名字':[每秒,次数]
  global.jumpAuth = new Map() // 跳过权限检测
  global.addJump = (jump = []) => {
    //路由不检测 jwt权限
    const map = global.jumpAuth
    jump.forEach((key) => map.set(key, true))
    return map
  }

  // 读取缓存
  global.getCache = async (key: string) => await global.apiCache[key]
  // 设置缓存
  global.setCache = (key: number, val: string) => {
    global.apiCache[key] = val
    // 去除过多的缓存信息 节约内存
    const cache = global.apiCache
    const num = global.apiClear
    const len = Object.keys(cache).length
    if (len > num) {
      const slice = Object.entries(cache).slice(num / 2, len)
      global.apiCache = Object.fromEntries(slice)
    }
  }
}
