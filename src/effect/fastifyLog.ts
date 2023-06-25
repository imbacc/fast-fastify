import type { FastifyBaseLogger } from 'fastify'

export class Logger {
  private proxy: FastifyBaseLogger

  constructor(logger: FastifyBaseLogger) {
    this.proxy = logger
  }

  error(msg: string, ...args: any[]) {
    return new Promise<void>((resolve) => {
      this.proxy.error(`[error] ${msg}`, ...args)
      resolve()
    })
  }

  warn(msg: string, ...args: any[]) {
    return new Promise<void>((resolve) => {
      this.proxy.warn(`[warn] ${msg}`, ...args)
      resolve()
    })
  }

  info(msg: string, ...args: any[]) {
    return new Promise<void>((resolve) => {
      this.proxy.info(`[info] ${msg}`, ...args)
      resolve()
    })
  }

  start(msg: string, ...args: any[]) {
    return new Promise<void>((resolve) => {
      this.proxy.info(`[start] ${msg}`, ...args)
      resolve()
    })
  }

  tag(mark: string, msg: string, ...args: any[]) {
    return new Promise<void>((resolve) => {
      this.proxy.info(`[${mark}] ${msg}`, ...args)
      resolve()
    })
  }
}