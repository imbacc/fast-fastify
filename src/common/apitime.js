/**
 * spname参数为api名称命名 例：apit_sms
 * spid索引 例：apit_sms_手机号码
 * time 为时间 xx/秒		默认30秒
 * count 为次数			默认 30秒/15次
 */

const { limit, apitime } = require('./config.js')

module.exports = (fastify, spname, spid, time = apitime.time, count = apitime.count, update = false) => {
  //false为关闭redis限流
  if (!apitime.open) return Promise.resolve(true)

  let cache_data = global.api_cache
  let val = `${spname}_${spid}`
  let key_id_time = `apit_${val}`
  let key_id_num = `apin_${val}`
  let cfg = limit[spname.split('?')[0]]

  if (typeof cfg === 'object' && !update) {
    time = cfg[0]
    count = cfg[1]
  }

  let api_time = cache_data[key_id_time] || false //获取 访问API时间间隔
  let api_count = cache_data[key_id_num] || false //获取 访问API次数间隔的时间

  let datetime = new Date().getTime()

  // console.log('api_time=',api_time)
  // console.log('api_count=',api_count)
  if (api_time && api_count) {
    //Api时间限制
    let second = (datetime - parseInt(api_time)) / 1000
    // console.log('second='+second)

    if (second < time) {
      //Api次数限制
      let add = parseInt(api_count) + 1
      if (add > count) return Promise.resolve(false)
      cache_data[key_id_num] = add
    } else {
      cache_data[key_id_time] = datetime
      cache_data[key_id_num] = 1
    }
  } else {
    cache_data[key_id_time] = datetime
    cache_data[key_id_num] = 1
  }

  return Promise.resolve(true)
}
