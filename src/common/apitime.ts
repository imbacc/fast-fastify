/**
 * spname参数为api名称命名 例：apit_sms
 * spid索引 例：apit_sms_手机号码
 * time 为时间 xx/秒		默认30秒
 * count 为次数			默认 30秒/15次
 */

import { globalMemory } from './globalMemory'
import { apitime, isDev } from './config'
import md5 from './MD5'
const { open: _open, time: _time, count: _count } = apitime
const { api } = globalMemory
export default (spname: string, spid: string, time: number = _time, count: number = _count, update: boolean = false) => {
  //false为关闭限流
  if (!_open) return Promise.resolve(true)

  let val = isDev ? `${spname}_${spid}` : md5(`${spname}_${spid}`)
  let key_time = `apit_${val}`
  let key_num = `apin_${val}`
  let cfg = api.getLimit(spname.split('?')[0])

  if (cfg && Array.isArray(cfg) && !update) {
    const [cfg_time, cfg_count] = cfg
    time = cfg_time
    count = cfg_count
  }

  let api_time: number = api.getCache(key_time) || 0 //获取 访问API时间间隔
  let api_count: number = api.getCache(key_num) || 0 //获取 访问API次数间隔的时间
  let datetime = new Date().getTime()

  if (api_time && api_count) {
    //Api时间限制
    let second = (datetime - api_time) / 1000

    if (second < time) {
      //Api次数限制
      let add = api_count + 1
      if (add > count) return Promise.resolve(false)
      api.setCache(key_num, add)
      return Promise.resolve(true)
    }
  }

  api.setCache(key_time, datetime)
  api.setCache(key_num, 1)
  return Promise.resolve(true)
}
