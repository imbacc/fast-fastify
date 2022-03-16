import type { METHOD } from '#/config'

type schema_DTYPE = { body?: any; query?: any }
type hooks_DTYPE = (reque: any, reply: any, done: Function) => void
interface apiImpl {
  url: string
  method: METHOD | METHOD.GET
  limit: [number, number]
  sql: { [key in string]: string }
  swagger?: {
    summary: string | '概括'
    description: string | '描述'
  }
  schema?: Record<keyof schema_DTYPE, any>
  jump?: boolean
  onRequest?: hooks_DTYPE
  onResponse?: hooks_DTYPE
  preValidation?: hooks_DTYPE // 该钩子总是在共享的 `preValidation` 钩子后被执行
  preHandler?: hooks_DTYPE // 该钩子总是在共享的 `preHandler` 钩子后被执行
  preSerialization?: hooks_DTYPE // 该钩子总是在共享的 `preSerialization` 钩子后被执行
}

export interface apiRouterImpl {
  [key in string]: apiImpl
}
