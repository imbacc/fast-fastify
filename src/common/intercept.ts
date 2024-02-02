import type { APICode } from '@/common/resultful'

import { logger, fastify, skipRouter, apiLimitMemory } from '@/effect/index'
import { resultful } from '@/common/resultful' // 返回数据构造

const ICO = '/favicon.ico'
// const H_KEY1 = 'Access-Control-Allow-Origin'
// const H_KEY2 = 'Access-Control-Allow-Headers'
// const H_KEY3 = 'Access-Control-Allow-Methods'
// const H_VAL1 = '*'
// const H_VAL2 = 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With'
// const H_VAL3 = 'POST,GET,OPTIONS'

export default () => {
  logger.start('use request hook!')

  // 请求
  fastify.addHook('onRequest', (reque, reply, next) => {
    // reply.header(H_KEY1, H_VAL1)
    // reply.header(H_KEY2, H_VAL2)
    // reply.header(H_KEY3, H_VAL3)

    const { url, method } = reque.raw
    if (url === ICO) {
      next()
      return
    }

    if (method === 'OPTIONS') {
      next()
      return
    }

    // 判断是否跳过白名单，直接next
    const urlIndex = url?.indexOf('?')
    const urlRouter = (urlIndex !== -1 ? url?.substring(0, urlIndex) : url) as string
    const skipBool = skipRouter.checkSkip(urlRouter)
    const blurSkipBool = skipRouter.checkBlurSkip(urlRouter)
    if (skipBool || blurSkipBool) {
      apiLimitMemory.apiLimit(`${url}`, reque.ip).then((bool) => {
        if (!bool) {
          logger.info('server api limit!', { url, code: 403 })
          reply.code(403).send(resultful('API_OUTTIME'))
        } else {
          next()
        }
      })
      return
    }

    if (!reque?.headers.authorization) {
      reply.code(401).send(resultful('UNMAKETOKEN_FAIL'))
    }

    const { query, body, id, ip } = reque
    // logger.info('request intercept call = ', { id, ip, url, query, body })

    apiLimitMemory.apiLimit(url as string, ip).then((bool) => {
      if (!bool) {
        logger.info('server api limit!', { url, code: 403 })
        reply.code(403).send(resultful('API_OUTTIME'))
      } else {
        reque.jwtVerify((err) => {
          // 没有携带令牌时 判断是否时授权路由=> 检测true为是授予令牌的接口 ,否则返回状态码 WHEREIS_CRACK
          let code: keyof APICode = 'WHEREIS_CRACK'
          let httpCode = 403
          if (err) {
            const bool = err.name === 'JsonWebTokenError'
            code = bool ? 'UNMAKETOKEN_RUBBISH' : 'UNMAKETOKEN_FAIL'
            httpCode = bool ? 403 : 401
          }
          if (err === null) code = 'SUCCESS'
          // logger.info('request intercept state = ', { ip, code })
          if (!(code === 'SUCCESS')) {
            reply.code(httpCode).send(resultful(code))
            return
          }
          next()
        })
      }
    })
  })

  // 预处理
  // fastify.addHook('preHandler', (req, reply, next) => {
  //  logger.info(`预处理 = ${{ id: req.id }}`)
  //  next()
  // })

  // 响应
  // fastify.addHook('onResponse', (res) => {
  // logger.info(`响应钩子 = ${{ id: req.id }}`)
  //  logger.info({ id: res.id },'响应拦截...')
  //  logger.info(res)
  // })
}
