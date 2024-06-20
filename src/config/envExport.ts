import { env } from 'bun'
import dotenv from 'dotenv'

const ENV = env.NODE_ENV
dotenv.config({
  path: [`.env.${ENV}`, '.env'],
})

// .env公共配置
const PORT = Number(env.PORT)
const IP = env.IP as string
const MD5KEY = env.MD5KEY as string

// .env.*.配置
const IGNORE_AUTH = JSON.parse(env.IGNORE_AUTH as string) as string[]
// mysql
const MYSQL_HOST = env.MYSQL_HOST as string
const MYSQL_PORT = Number(env.MYSQL_PORT)
const MYSQL_USER = env.MYSQL_USER as string
const MYSQL_PASSWORD = env.MYSQL_PASSWORD as string
const MYSQL_DATABASE = env.MYSQL_DATABASE as string
// redis
const REDIS_HOST = env.REDIS_HOST as string
const REDIS_PORT = Number(env.REDIS_PORT)
const REDIS_USERNAME = env.REDIS_USERNAME as string
const REDIS_PASSWORD = env.REDIS_PASSWORD as string
// apilimit
const APILIMIT_OPEN = env.APILIMIT_OPEN === 'true'
const APILIMIT_TIME = Number(env.APILIMIT_TIME)
const APILIMIT_COUNT = Number(env.APILIMIT_COUNT)
// swagger
const SWAGGER_USE = env.SWAGGER_USE === 'true'
const SWAGGER_HOST = env.SWAGGER_HOST as string
const SWAGGER_ROUTE = env.SWAGGER_ROUTE as string
const SWAGGER_MD5KEY = env.SWAGGER_MD5KEY as string
const SWAGGER_INFO_TITLE = env.SWAGGER_INFO_TITLE as string
const SWAGGER_INFO_VERSION = env.SWAGGER_INFO_VERSION as string
const SWAGGER_INFO_DESCRIPTION = env.SWAGGER_INFO_DESCRIPTION as string
const SWAGGER_APIKEY_TYPE = env.SWAGGER_APIKEY_TYPE as string as 'apiKey'
const SWAGGER_APIKEY_NAME = env.SWAGGER_APIKEY_NAME as string
const SWAGGER_APIKEY_IN = env.SWAGGER_APIKEY_IN as string
const SWAGGER_DOCS_DESCRIPTION = env.SWAGGER_DOCS_DESCRIPTION as string
const SWAGGER_DOCS_URL = env.SWAGGER_DOCS_URL as string
// alioss
const ALIOSS_REGION = env.ALIOSS_REGION as string
const ALIOSS_BUCKET = env.ALIOSS_BUCKET as string
const ALIOSS_ACCESSKEYID = env.ALIOSS_ACCESSKEYID as string
const ALIOSS_ACCESSKEYSECRET = env.ALIOSS_ACCESSKEYSECRET as string

export default {
  ENV,
  PORT,
  IP,
  MD5KEY,
  IGNORE_AUTH,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_USERNAME,
  REDIS_PASSWORD,
  APILIMIT_OPEN,
  APILIMIT_TIME,
  APILIMIT_COUNT,
  SWAGGER_USE,
  SWAGGER_HOST,
  SWAGGER_ROUTE,
  SWAGGER_MD5KEY,
  SWAGGER_INFO_TITLE,
  SWAGGER_INFO_VERSION,
  SWAGGER_INFO_DESCRIPTION,
  SWAGGER_APIKEY_TYPE,
  SWAGGER_APIKEY_NAME,
  SWAGGER_APIKEY_IN,
  SWAGGER_DOCS_DESCRIPTION,
  SWAGGER_DOCS_URL,
  ALIOSS_REGION,
  ALIOSS_BUCKET,
  ALIOSS_ACCESSKEYID,
  ALIOSS_ACCESSKEYSECRET,
}
