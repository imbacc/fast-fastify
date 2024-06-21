import type { RouteShorthandOptions } from 'fastify'
import type { RouteGenericInterface } from 'fastify/types/route'
import type { FastifyInstance } from 'fastify/types/instance'
import type { FastifyRequest } from 'fastify/types/request'
import type { FastifyReply } from 'fastify/types/reply'

export interface swagger_DTYPE {
  // 归属标签
  tags: string[]
  // 简介
  summary?: string
  // 描述
  description?: string
}

export type arrayRouter_DTYPE = {
  // 路由地址
  url: string
  // 限流 10秒/1次 访问限制
  limit?: [number, number]
  // 请求方式
  method: 'POST' | 'GET' | 'PUT' | 'DELETE'
  // 是否跳过路由认证
  skip?: boolean
  // swagger配置
  swagger?: Omit<swagger_DTYPE, 'tags'>
  // // 日志等级
  // logLevel?: LogLevel
  // // 限制body的size大小
  // bodyLimit?: number
  // // api /v1 /v2 版本设定
  // version?: string
  // // schema配置
  // schema?: {
  //   body?: JSONSchema | object
  //   querystring?: JSONSchema | object
  //   params?: JSONSchema | object
  //   headers?: JSONSchema | object
  // }
  handler: (
    this: FastifyInstance,
    request: FastifyRequest<{
      Body: any
      Querystring: any
      Params: any
      Headers: any
      Reply: any
    }>,
    reply: FastifyReply,
  ) => RouteGenericInterface['Reply'] | void | Promise<RouteGenericInterface['Reply'] | void>
  // handler: RouteHandlerMethod<
  //   RawServerDefault,
  //   RawRequestDefaultExpression<RawServerDefault>,
  //   RawReplyDefaultExpression,
  //   RouteGenericInterface,
  //   ContextConfigDefault,
  //   FastifySchema,
  //   FastifyTypeProviderDefault,
  //   FastifyBaseLogger
  // >

  // onRequest是在请求生命周期中执行的第一个钩子。
  // 上一个钩子没有，下一个钩子将进行预解析。
  // 注意：在onRequest钩子中，request.body将始终为null，因为body解析发生在preHandler钩子之前。
  // onRequest?: onRequestHookHandler

  // 预解析是请求生命周期中要执行的第二个钩子。
  // 上一个钩子是onRequest，下一个钩子将是preValidation。
  // 注意：在preParsing钩子中，request.body将始终为null，因为body解析发生在preHandler钩子之前。
  // preParsing?: preParsingHookHandler

  // preValidation是请求生命周期中要执行的第三个钩子。
  // 上一个钩子是preParsing，下一个钩子将是preHandler。
  // preValidation?: preValidationHookHandler

  // preHandler是请求生命周期中要执行的第四个钩子。
  // 上一个钩子是preValidation，下一个钩子将是preSerialization。
  // preHandler?: preHandlerHookHandler

  // preSerialization是请求生命周期中要执行的第五个钩子。
  // 上一个钩子是preHandler，下一个钩子将是onSend。
  // 注意：如果有效负载是字符串、Buffer、流或null，则不会调用钩子。
  // preSerialization?: preSerializationHookHandler<any>

  // onResponse是请求钩子生命周期中的第七个也是最后一个钩子。
  // 上一个钩子是onSend，没有下一个钩子。
  // onResponse钩子是在发送响应时执行的，因此您将无法向客户端发送更多数据。
  // 然而，它对于向外部服务发送数据（例如收集统计数据）可能很有用。
  // onResponse?: onResponseHookHandler

  // 如果您需要监视服务中超时的请求，onTimeout非常有用。
  // （如果在fastify实例上设置了connectionTimeout属性）当请求超时并且http套接字挂起时，
  // 就会执行onTimeout钩子。因此，您将无法向客户端发送数据。
  // onTimeout?: onTimeoutHookHandler

  // 如果您需要进行一些自定义错误日志记录或在出现错误时添加一些特定的头，
  // 那么这个钩子非常有用。它不是用来更改错误的，调用reply.send将引发异常。
  // 只有在执行了customErrorHandler之后，并且只有在customErrorHandler向用户发回错误时，
  // 才会执行此钩子（请注意，默认的customErrorHandler总是将错误发回用户）。
  // 注意：与其他钩子不同，不支持将错误传递给done函数。
  // onError?: onErrorHookHandler

} & RouteShorthandOptions

export type firstRouter_DTYPE = {
  // 是代理
  isProxy: boolean
  // swagger配置
  swagger?: swagger_DTYPE
  // 路由前缀
  prefix?: string
} & Omit<arrayRouter_DTYPE, 'url' | 'method' | 'swagger' | 'handler'>

export type router_DTYPE = [
  firstRouter_DTYPE,
  ...arrayRouter_DTYPE[],
]
