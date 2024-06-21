import type { FastifyRequest } from 'fastify/types/request'

export type request_DTYPE<T, Y = any> = FastifyRequest<{
  Body: T
  Querystring: T
  Params: T
  Headers: Y
}>
