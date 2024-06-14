/**
 * spname参数为api名称命名 例：apit_sms
 * spid索引 例：apit_sms_手机号码
 * time 为时间 xx/秒  默认30秒
 * count 为次数   默认 30秒/15次
 */

import { apiLimitConfig, isDev } from '@/config/index'
import md5 from 'imba-md5'
import v8 from 'node:v8'

function getObjectSize(obj) {
  const bytes = v8.serialize(obj).byteLength
  return bytes / 1000000
}

const { open: _open, time: _time, count: _count } = apiLimitConfig

export class ApiLimitMemory {
  private max = 1000000
  private cache: Record<string, number> = {}
  private limit: Record<string, [number, number]> = {}
  private proMark

  constructor(max?: number) {
    this.max = max || 1000000
  }

  /**
   * api限流 内存版本
   * @param spname 标记名称
   * @param spid 唯一id
   * @param time 时间 秒单位
   * @param count 数量
   * @param update 是否更新替换config参数
   * @returns
   */
  apiLimit(spname: string, spid: string, time = _time, count = _count, update = false) {
    return new Promise<boolean>((resolve) => {
      // false为关闭限流
      if (!_open) return resolve(true)

      const key = isDev ? `${spname}_${spid}` : md5(`${spname}_${spid}`)
      const keyTime = `apit_${key}`
      const keyNum = `apin_${key}`
      const cfg = this.getLimit(spname.split('?')[0])

      if (cfg && Array.isArray(cfg) && !update) {
        const [cfgTime, cfgCount] = cfg
        time = cfgTime
        count = cfgCount
      }

      const apiTime = this.getCache(keyTime) || 0 // 获取 访问API时间间隔
      const apiCount = this.getCache(keyNum) || 0 // 获取 访问API次数间隔的时间
      const dateTime = new Date().getTime()

      if (apiTime && apiCount) {
        // Api时间限制
        const second = (dateTime - apiTime) / 1000

        if (second < time) {
          // Api次数限制
          const add = apiCount + 1
          if (add > count) return resolve(false)
          this.setCache(keyNum, add)
          return resolve(true)
        }
      }

      this.setCache(keyTime, dateTime)
      this.setCache(keyNum, 1)
      return resolve(true)
    })
  }

  private getCache(key: string) {
    return this.cache[key]
  }

  private setCache(key: string, val) {
    this.cache[key] = val
    // const sizeInMB = getObjectSize(this.cache)
    // console.log(`对象占用的内存大小为: ${sizeInMB} MB`)
    this.delayClear()
  }

  // 去除过多的缓存信息 节约内存
  private delayClear() {
    if (this.proMark) return this.proMark
    const pro = new Promise<void>((resolve) => {
      const len = Object.keys(this.cache).length
      if (len > this.max) {
        const slice = Object.entries(this.cache).slice(this.max / 2, len)
        this.cache = Object.fromEntries(slice)
      }
      resolve()
    })
    this.proMark = pro
    pro.finally(() => {
      this.proMark = null
    })
    return pro
  }

  getLimit(key: string): [number, number] {
    return this.limit[key]
  }

  setLimit(key: string, val: [number, number]) {
    this.limit[key] = val
  }
}
