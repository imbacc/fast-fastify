// 定义全局属性
// global.base64 = (str) => Buffer.from(str).toString('base64') //base64加密
// global.base64_re = (str) => Buffer.from(str, 'base64').toString() //base64解密
global.api_clear = 10000
global.api_cache = {} // api接口缓存
global.api_limit = {} // api限流设置 '路由名字':[每秒,次数]
global.jump_auth = new Map() // 跳过权限检测
global.add_jump = (jump = []) => {
  //路由不检测 jwt权限
  const map = global.jump_auth
  jump.forEach((key) => map.set(key, true))
  return map
}

// 去除过多的缓存信息 节约内存
const _cache = () => {
  const cache = global.api_cache
  const num = global.api_clear
  const len = Object.keys(cache).length
  if (len > num) {
    const slice = Object.entries(cache).slice(num / 2, len)
    global.api_cache = Object.fromEntries(slice)
  }
}

// 读取缓存
global.get_cache = async (key) => await global.api_cache[key]

// 设置缓存
global.set_cache = (key, val) => {
  global.api_cache[key] = val
  _cache()
}
