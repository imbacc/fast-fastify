import type { METHOD } from '#/config'

type hooks_DTYPE = (reque: any, reply: any, done: Function) => void
interface api_DTYPE {
  url: string
  method: keyof typeof METHOD
  limit?: [number, number] | [30, 15]
  sql?: { [key: string]: string } | any
  swagger?: {
    summary: string | '概括'
    description: string | '描述'
  }
  schema?: Partial<Record<'body' | 'query', string>>
  skip?: boolean
  onRequest?: hooks_DTYPE
  onResponse?: hooks_DTYPE
  preValidation?: hooks_DTYPE // 该钩子总是在共享的 `preValidation` 钩子后被执行
  preHandler?: hooks_DTYPE // 该钩子总是在共享的 `preHandler` 钩子后被执行
  preSerialization?: (reque: any, reply: any, payload: any, done: Function) => void // 该钩子总是在共享的 `preSerialization` 钩子后被执行
}

export interface apiRouter {
  [key: string]: api_DTYPE
}
