import type {
  checkAuth_CONFIG,
  checkAuth_DTYPE,
  // listen
  listen_CONFIG,
  listen_DTYPE,
  // jwt
  jwt_CONFIG,
  jwt_DTYPE,
  // mysql
  mysql_CONFIG,
  mysql_DTYPE,
  // redis
  redis_CONFIG,
  redis_DTYPE,
  // apiLimit
  apiLimit_CONFIG,
  apiLimit_DTYPE,
  // swagger
  swagger_CONFIG,
  swagger_DTYPE,
} from '#/config'

import md5 from 'imba-md5'
import process from 'node:process'

const env = process.env.NODE_ENV || 'dev'

// 赋予路由跳过检测权限
const _checkAuth: checkAuth_DTYPE = {
  dev: ['/token'],
  prod: ['/token'],
}

// 端口信息
const _listen: listen_DTYPE = {
  dev: {
    port: 3100, // 默认端口
    ip: '127.0.0.1', // 指定监听的地址 当部署在 Docker 或其它容器上时，明智的做法是监听 0.0.0.0
  },
  prod: {
    port: 3000,
    ip: '127.0.0.1',
  },
}

// 全局配置
const _jwtKey: jwt_DTYPE = {
  dev: md5('imbacc'),
  prod: md5('by imbacc'),
}

// mysql
const _mysql: mysql_DTYPE = {
  dev: {
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'test',
  },
  prod: {
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'test',
  },
}

// redis
const _redis: redis_DTYPE = {
  dev: {
    username: 'root',
    password: '',
    host: '127.0.0.1',
    port: 6379,
  },
  prod: {
    username: 'root',
    password: 'root',
    host: '127.0.0.1',
    port: 6379,
  },
}

// 每个接口限流 也可在Nginx上限流
const _apiLimit: apiLimit_DTYPE = {
  dev: {
    open: true, // 或 -> Boolean(env === 'dev')
    time: 30,
    count: 15,
  },
  prod: {
    open: true,
    time: 30,
    count: 15,
  },
}

// swagger信息
const _swagger: swagger_DTYPE = {
  dev: {
    use: true,
    route: `/swagger/${md5('地址加密')}`,
    info: {
      title: 'REST API',
      version: '1.0.0',
      description: 'swagger api description... 授权格式: Authorization: Bearer token',
    },
    host: 'auto', // auto为listenConfig 端口 ip
    apiKey: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
    externalDocs: {
      description: '查看fastify文档',
      url: 'https://www.fastify.io/',
    },
  },
  prod: {
    use: false,
  },
}

export const mysqlConfig = _mysql[env] as mysql_CONFIG
export const redisConfig = _redis[env] as redis_CONFIG
export const checkAuthConfig = _checkAuth[env] as checkAuth_CONFIG
export const jwtKeyConfig = _jwtKey[env] as jwt_CONFIG
export const apiLimitConfig = _apiLimit[env] as apiLimit_CONFIG
export const listenConfig = _listen[env] as listen_CONFIG
export const swaggerConfig = _swagger[env] as swagger_CONFIG
export const isDev = Boolean(env === 'dev')
