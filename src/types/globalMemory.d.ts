export type apiCache_DTYPE = { [key: string]: any } // Record<string, any>
export type apiLimit_DTYPE = { [key: string]: [number, number] }
interface api {
  // api接口键为N时回收内存
  apiClear: number | 10000
  // api接口缓存
  apiCache: apiCache_DTYPE
  // api限流设置 '路由名字':[每秒,次数]
  apiLimit: apiLimit_DTYPE
  // 获取缓存
  getCache: (key: string) => Promise<string>
  // 设置缓存
  setCache: (key: string, val: any) => boolean
}

export type skipAuth_DTYPE = Map<string, any>
interface skip {
  // 跳过权限检测
  skipAuth: jumpAuth_DTYPE
  // 添加跳过权限函数
  addSkip: (skip: Array<string>) => skipAuth_DTYPE
}

interface base {
  // base64加密
  base64: (str: string) => string
  // base64解密
  base64Re: (str: string) => string
}

interface cacheSql {
  cacheSql: <T>(sql: string, val: Array<any>, time: number, reque: any) => Promise<T>
}

export interface globalMemory_DTYPE extends api, skip, base, cacheSql {}
