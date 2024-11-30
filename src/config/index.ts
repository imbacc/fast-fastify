import type {
  checkAuth_CONFIG,
  // listen
  listen_CONFIG,
  // jwt
  jwt_CONFIG,
  // mysql
  mysql_CONFIG,
  // redis
  redis_CONFIG,
  // apiLimit
  apiLimit_CONFIG,
  // swagger
  swagger_CONFIG,
  // alioss
  aliOss_CONFIG,
} from '#/config'

import md5 from 'imba-md5'
import envConfig from './envExport'
console.log('%c [ envConfig ]-21', 'font-size:14px; background:#41b883; color:#ffffff;', envConfig)

// 赋予路由跳过检测权限
const _checkAuth: checkAuth_CONFIG = envConfig.IGNORE_AUTH

// 端口信息
const _listen: listen_CONFIG = {
  port: envConfig.PORT, // 默认端口
  ip: envConfig.IP, // 指定监听的地址 当部署在 Docker 或其它容器上时，明智的做法是监听 0.0.0.0
}

// 全局配置
const _jwtKey: jwt_CONFIG = md5(envConfig.MD5KEY)

// mysql
const _mysql: mysql_CONFIG = {
  use: envConfig.MYSQL_USE,
  host: envConfig.MYSQL_HOST,
  user: envConfig.MYSQL_USER,
  password: envConfig.MYSQL_PASSWORD,
  port: envConfig.MYSQL_PORT,
  database: envConfig.MYSQL_DATABASE,
}

// redis
const _redis: redis_CONFIG = {
  use: envConfig.REDIS_USE,
  username: envConfig.REDIS_USERNAME,
  password: envConfig.REDIS_PASSWORD,
  host: envConfig.REDIS_HOST,
  port: envConfig.REDIS_PORT,
}

// 每个接口限流 也可在Nginx上限流
const _apiLimit: apiLimit_CONFIG = {
  open: envConfig.APILIMIT_OPEN, // 或 -> Boolean(env === 'dev')
  time: envConfig.APILIMIT_TIME,
  count: envConfig.APILIMIT_COUNT,
}

// swagger信息
const _swagger: swagger_CONFIG = {
  use: envConfig.SWAGGER_USE,
  route: envConfig.SWAGGER_ROUTE?.replace('#{SWAGGER_MD5KEY}', md5(envConfig.SWAGGER_MD5KEY)),
  info: {
    title: envConfig.SWAGGER_INFO_TITLE,
    version: envConfig.SWAGGER_INFO_VERSION,
    description: envConfig.SWAGGER_INFO_DESCRIPTION,
  },
  host: envConfig.SWAGGER_HOST,
  apiKey: {
    type: envConfig.SWAGGER_APIKEY_TYPE,
    name: envConfig.SWAGGER_APIKEY_NAME,
    in: envConfig.SWAGGER_APIKEY_IN,
  },
  externalDocs: {
    description: envConfig.SWAGGER_DOCS_DESCRIPTION,
    url: envConfig.SWAGGER_DOCS_URL,
  },
}

// alioss
const _aliOss: aliOss_CONFIG = {
  region: envConfig.ALIOSS_REGION,
  accessKeyId: envConfig.ALIOSS_ACCESSKEYID,
  accessKeySecret: envConfig.ALIOSS_ACCESSKEYSECRET,
  bucket: envConfig.ALIOSS_BUCKET,
}

export const mysqlConfig = _mysql
export const redisConfig = _redis
export const checkAuthConfig = _checkAuth
export const jwtKeyConfig = _jwtKey
export const apiLimitConfig = _apiLimit
export const listenConfig = _listen
export const swaggerConfig = _swagger
export const isDev = Boolean(envConfig.ENV === 'dev')
export const aliOssConfig = _aliOss
