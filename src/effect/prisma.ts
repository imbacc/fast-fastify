// https://www.prisma.io/docs/orm/reference/prisma-client-reference#prismaclient

import { PrismaClient } from '@prisma/client'

// prisma实例对象
export class Prisma extends PrismaClient {
  constructor() {
    super({
      log: ['query', 'warn', 'error'],
    })

    setTimeout(() => {
      this.expandQuery()
      this.expandModel()
      this.expandResult()
      this.expandClient()
    })
  }

  private expandQuery() {
    this.$extends({
      query: {
        app_info: {
          findMany({ args, query }) {
            console.log('%c [ args ]-16', 'font-size:14px; background:#41b883; color:#ffffff;', args)
            return query(args)
          },
          findUnique({ args, query }) {
            console.log('%c [ args ]-16', 'font-size:14px; background:#41b883; color:#ffffff;', args)
            return query(args)
          },
          create({ args, query }) {
            console.log('%c [ args ]-16', 'font-size:14px; background:#41b883; color:#ffffff;', args)
            return query(args)
          },
          createMany({ args, query }) {
            console.log('%c [ args ]-16', 'font-size:14px; background:#41b883; color:#ffffff;', args)
            return query(args)
          },
          update({ args, query }) {
            console.log('%c [ args ]-16', 'font-size:14px; background:#41b883; color:#ffffff;', args)
            return query(args)
          },
          updateMany({ args, query }) {
            console.log('%c [ args ]-16', 'font-size:14px; background:#41b883; color:#ffffff;', args)
            return query(args)
          },
          delete({ args, query }) {
            console.log('%c [ args ]-16', 'font-size:14px; background:#41b883; color:#ffffff;', args)
            return query(args)
          },
          deleteMany({ args, query }) {
            console.log('%c [ args ]-16', 'font-size:14px; background:#41b883; color:#ffffff;', args)
            return query(args)
          },
          count({ args, query }) {
            console.log('%c [ args ]-16', 'font-size:14px; background:#41b883; color:#ffffff;', args)
            return query(args)
          },
        },
      },
    })
  }

  private expandModel() {
    const xxx1 = async (x1: string, x2: string) => {
      return await this.app_info.findUnique({
        where: {
          id: 1,
        },
      })
    }

    const xxx2 = async (x1: string, x2: string) => {
      return await this.app_info.findUnique({
        where: {
          id: 1,
        },
      })
    }

    this.$extends({
      model: {
        // 给所有模型追加函数 例-> prisma.app_info.test()
        $allModels: {
          test() {
            return 'test'
          },
        },
        // 给app_info模型追加函数 -> prisma.app_info.xxx1()
        app_info: {
          xxx1,
          xxx2,
        },
      },
    })
  }

  private expandResult() {
    this.$extends({
      result: {
        // 自定义属性
        customProperty: 'aaa',
      },
    })
  }

  private expandClient() {
    const customMethod = () => {
      console.log('Custom Method')
    }

    this.$extends({
      client: {
        // 自定义函数
        customMethod,
      },
    })
  }
}