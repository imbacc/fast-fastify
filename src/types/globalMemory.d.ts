export type apiCache_DTYPE = { [key in string]: any } // Record<string, any>
export type apiLimit_DTYPE = { [key in string]: [number, number] }
interface apiImpl {
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

export type jumpAuth_DTYPE = Map<string, any>
interface jumpImpl {
  // 跳过权限检测
  jumpAuth: jumpAuth_DTYPE
  // 添加跳过权限函数
  addJump: (jump: Array<string>) => jumpAuth_DTYPE
}

interface baseImpl {
  // base64加密
  base64: (str: string) => string
  // base64解密
  base64Re: (str: string) => string
}

export interface globalMemoryImpl extends apiImpl, jumpImpl, baseImpl {}
