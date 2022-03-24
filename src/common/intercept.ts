import { globalMemory } from './globalMemory'
import md5 from './MD5'
import resultful from '@/db/resultful' //返回数据构造
import apitime from './apitime' //API限流

const { fastify, skipAuth } = globalMemory //跳过检测jwt

const checkCode = async (onlyid: string, reply: any, code: string, httpCode: number, next: Function) => {
  console.log({ onlyid, code }, '拦截状态...')
  if (!(code === 'SUCCESS')) {
    reply.code(httpCode).send(resultful(code))
    return
  }
  await next()
}

//检测JWT令牌
const checkJwt = async (onlyid: string, reque: any, reply: any, next: Function) => {
  reque.jwtVerify((err: any) => {
    //没有携带令牌时 判断是否时授权路由=> 检测true为是授予令牌的接口 ,否则返回状态码 WHEREIS_CRACK
    let code = 'WHEREIS_CRACK',
      httpCode = 403
    if (err) {
      let bool = err.name === 'JsonWebTokenError'
      code = bool ? 'UNMAKETOKEN_RUBBISH' : 'UNMAKETOKEN_FAIL'
      httpCode = bool ? 403 : 401
    }
    if (err === null) code = 'SUCCESS'
    checkCode(onlyid, reply, code, httpCode, next)
  })
}

const ICO = '/favicon.ico'
const H_KEY1 = 'Access-Control-Allow-Origin'
const H_KEY2 = 'Access-Control-Allow-Headers'
const H_KEY3 = 'Access-Control-Allow-Methods'
const H_VAL1 = '*'
const H_VAL2 = 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With'
const H_VAL3 = 'POST,GET,OPTIONS'

export default () => {
  console.log('开启拦截器...')

  //请求
  fastify.addHook('onRequest', (reque, reply, next) => {
    reply.header(H_KEY1, H_VAL1)
    reply.header(H_KEY2, H_VAL2)
    reply.header(H_KEY3, H_VAL3)

    const raw = reque.raw
    const url = raw.url
    if (url === ICO) {
      next()
      return
    }

    if (raw.method === 'OPTIONS') {
      next()
      return
    }

    // 判断是否跳过白名单，直接next
    const url_idx = url.indexOf('?')
    const url_str = url_idx !== -1 ? url.substring(0, url_idx) : url
    const jump = skipAuth.get(url_str)
    if (jump) {
      next()
      return
    }

    const { query, body, id, headers } = reque
    const onlyid = md5(headers.authorization || '')
    console.log({ id, onlyid, url, params: { ...query }, body }, '请求拦截...')

    apitime(url, onlyid).then((bool) => {
      if (!bool) {
        console.log({ id, code: 403 }, '服务器繁忙...')
        reply.code(403).send(resultful('API_OUTTIME'))
      } else {
        checkJwt(onlyid, reque, reply, next)
      }
    })
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
