import type {
  CONFIG_DTYPE,
  checkAuth_DTYPE,
  // listen
  listenConfigType,
  listenConfig_DTYPE,
  // jwt
  jwtConfigType,
  jwtConfig_DTYPE,
  // mysql
  mysqlConfigType,
  mysqlConfig_DTYPE,
  // redis
  redisConfigType,
  redisConfig_DTYPE,
  // apiTime
  apiTimeConfigType,
  apiTimeConfig_DTYPE,
  // swagger
  swaggerConfigType,
  swaggerConfig_DTYPE
} from '#/config'

import { globalMemory } from './globalMemory'
import md5 from '@/common/MD5'

const env = (process.env.NODE_ENV || 'dev') as CONFIG_DTYPE
console.log('env=', env)

// 赋予路由跳过检测权限
const checkAuth: checkAuth_DTYPE = {
  dev: ['/token'],
  prod: ['/token']
}

// 初始化执行
globalMemory.addSkip(checkAuth[env])

// 端口信息
const listenConfig: listenConfig_DTYPE = {
  dev: {
    port: 3000, // 默认端口
    ip: '127.0.0.1', // 指定监听的地址 当部署在 Docker 或其它容器上时，明智的做法是监听 0.0.0.0
    queue: 511 // 指定积压队列的大小
  },
  prod: {
    port: 3000,
    ip: '127.0.0.1',
    queue: 511
  }
}

// 全局配置
const jwtConfig: jwtConfig_DTYPE = {
  dev: md5('imbacc'),
  prod: md5('by imbacc')
}

// mysql
const mysqlConfig: mysqlConfig_DTYPE = {
  dev: {
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'test'
  },
  prod: {
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'test'
  }
}

// redis
const redisConfig: redisConfig_DTYPE = {
  dev: {
    host: '127.0.0.1',
    port: 6379
  },
  prod: {
    host: '127.0.0.1',
    port: 6379
  }
}

// 每个接口限流 也可在Nginx上限流
const apiTimeConfig: apiTimeConfig_DTYPE = {
  dev: {
    open: true, // 或 -> Boolean(env === 'dev')
    time: 30,
    count: 15
  },
  prod: {
    open: true,
    time: 30,
    count: 15
  }
}

// swagger信息
const swaggerConfig: swaggerConfig_DTYPE = {
  dev: {
    use: true,
    route: `/swagger/${md5('地址加密')}`,
    info: {
      title: 'REST API',
      version: '1.0.0',
      description: 'swagger api description... 授权格式: Authorization: Bearer token'
    },
    host: 'auto', // auto为listenConfig 端口 ip
    apiKey: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header'
    },
    tags: [
      { name: 'appinfo', description: '这里是appinfo接口模块' },
      { name: 'token', description: '这里是授权接口模块' }
    ],
    externalDocs: {
      description: '查看fastify文档',
      url: 'https://www.w3cschool.cn/fastify/fastify-zopy35zj.html'
    }
  },
  prod: {
    use: false
  }
}

export const mysql = mysqlConfig[env] as mysqlConfigType
export const redis = redisConfig[env] as redisConfigType
export const jwtkey = jwtConfig[env] as jwtConfigType
export const apitime = apiTimeConfig[env] as apiTimeConfigType
export const listen = listenConfig[env] as listenConfigType
export const swagger = swaggerConfig[env] as swaggerConfigType
export const isDev = Boolean(env === 'dev')
export const enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}
