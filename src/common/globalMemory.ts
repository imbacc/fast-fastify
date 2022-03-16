import type { apiCache_DTYPE, apiLimit_DTYPE, jumpAuth_DTYPE, globalMemoryImpl } from '#/globalMemory'

class globalMemoryNode implements globalMemoryImpl {
  public apiClear: number = 10000
  public apiCache: apiCache_DTYPE = {}
  public apiLimit: apiLimit_DTYPE = {}
  public jumpAuth: jumpAuth_DTYPE = new Map()

  // 路由不检测 jwt权限
  addJump(jump: Array<string>) {
    jump.forEach((key) => this.jumpAuth.set(key, true))
    return this.jumpAuth
  }

  async getCache(key: string): Promise<string> {
    return await this.apiCache[key]
  }

  setCache(key: string, val: any) {
    this.apiCache[key] = val
    // 去除过多的缓存信息 节约内存
    const cache = this.apiCache
    const num = this.apiClear
    const len = Object.keys(cache).length
    if (len > num) {
      const slice = Object.entries(cache).slice(num / 2, len)
      this.apiCache = Object.fromEntries(slice)
    }
    return true
  }

  base64(str: string) {
    return Buffer.from(str).toString('base64')
  }

  base64Re(str: string) {
    return Buffer.from(str, 'base64').toString()
  }
}

const globalMemory = new globalMemoryNode()
export { globalMemory }
