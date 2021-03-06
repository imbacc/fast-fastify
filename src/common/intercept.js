const resultful = require('../db/resultful.js') //返回数据构造
const apitime = require('./apitime') //API限流
const jumpCheck = global.jump_auth //跳过检测jwt

//检测CMAKE令牌
const check_cmake = (fastify, onlyid, reque, reply, code = 'SUCCESS', next) => {
  if (code === 'JUMP_CHECK') {
    // console.log('JUMP_CHECK TOKEN...')
    next()
    return
  }

  const { id, raw } = reque
  console.log({ id, code }, '拦截状态...')

  if (code === 'SUCCESS') {
    let name = `api_${fastify.md5(raw.url + onlyid)}`
    // console.log('api name=', name)

    if (raw.method === 'GET') {
      //读取是否 接口有redis缓存
      fastify.get_redis(name).then((cache) => {
        if (cache) {
          console.log('api cache=' + name)
          reply.send(cache)
        } else {
          next()
        }
      })
    } else {
      //POST请求跳过检测缓存直接执行
      next()
    }
  } else {
    reply.code(403).send(resultful(code))
  }
}

//检测JWT令牌
const check_jwt = (fastify, onlyid, reque, reply, next) => {
  const { raw } = reque
  if (raw.method === 'OPTIONS') {
    reply.code(200).send()
    return
  }
  reque.jwtVerify((err, decoded) => {
    let url_idx = raw.url.indexOf('?')
    let url_str = url_idx !== -1 ? raw.url.substring(0, url_idx) : raw.url
    //没有携带令牌时 判断是否时授权路由=> 检测true为是授予令牌的接口 ,否则返回状态码 WHEREIS_CRACK
    let state = jumpCheck.get(url_str) ? 'JUMP_CHECK' : 'WHEREIS_CRACK'
    if (err && err.name === 'JsonWebTokenError') {
      reply.code(403).send(resultful('UNMAKETOKEN_RUBBISH'))
      return
    }
    if (err === null) state = 'SUCCESS'
    check_cmake(fastify, onlyid, reque, reply, state, next)
  })
}

const ORIGIN = ['Access-Control-Allow-Origin', '*']
const HEADERS = ['Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With']
const METHODS = ['Access-Control-Allow-Methods', 'POST,GET,OPTIONS']

module.exports = (fastify) => {
  console.log('开启拦截器...')

  //请求
  fastify.addHook('onRequest', (reque, reply, next) => {
    const { raw, query, body, id, headers } = reque
    const url = raw.url
    if (url === '/favicon.ico') {
      reply.code(404).send()
    } else {
      console.log({ id, url, params: { ...query }, body }, '请求拦截...')
      const onlyid = fastify.md5(headers.authorization) || ''

      reply.header(...ORIGIN)
      reply.header(...HEADERS)
      reply.header(...METHODS)

      apitime(fastify, url, onlyid).then((bool) => {
        if (!bool) {
          console.log({ id, code: 401 }, '服务器繁忙...')
          reply.code(401).send(resultful('API_OutTime'))
        } else {
          check_jwt(fastify, onlyid, reque, reply, next)
        }
      })
    }
  })

  //预处理 - 当做响应拦截算了
  // fastify.addHook('preHandler', (req, reply, next) => {
  // 	console.log({ id: req.id },'响应拦截...')
  // 	next()
  // })

  //响应 找不到next方法
  // fastify.addHook('onResponse', (res, next) => {
  // 	console.log({ id: res.id },'响应拦截...')
  // 	console.log(res)
  // 	// next()
  // })
}
