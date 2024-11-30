/**
 * spname参数为api名称命名 例：apit_sms
 * spid索引 例：apit_sms_手机号码
 * time 为时间 xx/秒  默认30秒
 * count 为次数   默认 30秒/15次
 */

import { apiLimitConfig, isDev } from '@/config/index'
import { redis } from '@/effect/index'
import md5 from 'imba-md5'

const { open: _open, time: _time, count: _count } = apiLimitConfig

export class ApiLimitRedis {
  private limit: Record<string, [number, number]> = {}

  /**
   * api限流 内存版本
   * @param spname 标记名称
   * @param spid 唯一id
   * @param time 时间 秒单位
   * @param count 数量
   * @param update 是否更新替换config参数
   * @returns
   */
  async apiLimitCall(spname: string, spid: string, time = _time, count = _count, update = false) {
    // false为关闭限流
    if (!_open) return true

    const key = isDev ? `${spname}_${spid}` : md5(`${spname}_${spid}`)
    // console.log('%c [ key ]-31', 'font-size:14px; background:#41b883; color:#ffffff;', key)
    const keyTime = `apit_${key}`
    const keyNum = `apin_${key}`
    const cfg = this.getLimit(spname.split('?')[0])

    if (cfg && Array.isArray(cfg) && !update) {
      const [cfgTime, cfgCount] = cfg
      time = cfgTime
      count = cfgCount
    }

    const apiTime = await this.getRedisCache(keyTime) || 0 // 获取 访问API时间间隔
    const apiCount = await this.getRedisCache(keyNum) || 0 // 获取 访问API次数间隔的时间
    const dateTime = new Date().getTime()

    if (apiTime && apiCount) {
      // Api时间限制
      const second = (dateTime - Number.parseInt(apiTime)) / 1000

      if (second < time) {
        // Api次数限制
        const add = Number.parseInt(apiCount) + 1
        if (add > count) return false
        this.setRedisCache(keyNum, add)
        return true
      }
    }

    this.setRedisCache(keyTime, dateTime)
    this.setRedisCache(keyNum, 1)
    return true
  }

  private getRedisCache<T = any>(key: string) {
    return redis.getRedis<T>(key)
  }

  private setRedisCache(key: string, val) {
    redis.setRedis(key, val, 10)
  }

  private getLimit(key: string): [number, number] {
    return this.limit[key]
  }

  setLimit(key: string, val: [number, number]) {
    this.limit[key] = val
  }
}
