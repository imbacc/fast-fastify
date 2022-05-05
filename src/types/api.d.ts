import type { METHOD } from '#/config'
import { AnyRecord } from 'dns'
import type { JSONSchema } from 'fluent-json-schema'

type handler_DTYPE = (reque: any, reply: any) => void | Promise<void>
type hooks_DTYPE = (reque: any, reply: any, done: Function) => void
type hooks_Serial_DTYPE = (reque: any, reply: any, payload: any, done: Function) => void
export interface api_DTYPE {
  url: string
  method: keyof typeof METHOD
  limit?: [number, number] | [30, 15]
  sql?: any
  swagger?: {
    summary: string | '概括'
    description: string | '描述'
  }
  schema?: Partial<Record<'body' | 'querystring' | 'params' | 'headers', JSONSchema>>
  skip?: boolean
  handler?: handler_DTYPE
  onRequest?: hooks_DTYPE // 每当接收到一个请求时触发的函数。可以是一个函数数组。
  onResponse?: hooks_DTYPE // 当响应发送后调用的函数。因此，在这个函数内部，不允许再向客户端发送数据。可以是一个函数数组。
  preValidation?: hooks_DTYPE // 在共享的 preValidation 钩子之后执行的函数，在路由层进行认证等场景中会有用处。可以是一个函数数组。
  preHandler?: hooks_DTYPE // 处理请求之前调用的函数。可以是一个函数数组。
  preSerialization?: hooks_Serial_DTYPE // 序列化之前调用的函数。
}

export interface apiRouter_DTYPE {
  [key: string]: api_DTYPE
}
