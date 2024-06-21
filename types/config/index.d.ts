// CONFIG
// export interface  CONFIG_DTYPE<T, P> {
//   dev: T
//   prod: P | T // P extends T ? P : T
//   // dev: T extends infer R ? R : T
//   // prod: (P | T) extends infer R ? R : T
// }
// export interface CONFIG_DTYPE<T> {
//   dev: T
//   prod: T
// }

// checkAuth
export type checkAuth_CONFIG = Array<string>
// export type checkAuth_DTYPE = CONFIG_DTYPE<checkAuth_CONFIG>

// listen
export interface listen_CONFIG {
  port: number
  ip: string
}
// export type listen_DTYPE = CONFIG_DTYPE<listen_CONFIG>

// jwt
export type jwt_CONFIG = string
// export type jwt_DTYPE = CONFIG_DTYPE<jwt_CONFIG>

// mysql
export interface mysql_CONFIG {
  host: string | '127.0.0.1'
  user: string
  password: string
  port: number | 3306
  database: string
}
// export type mysql_DTYPE = CONFIG_DTYPE<mysql_CONFIG>

// redis
export interface redis_CONFIG {
  username: string
  password: string
  host: string | '127.0.0.1'
  port: number | 6379
}
// export type redis_DTYPE = CONFIG_DTYPE<redis_CONFIG>

// apiLimit
export interface apiLimit_CONFIG {
  open: boolean
  time: number
  count: number
}
// export type apiLimit_DTYPE = CONFIG_DTYPE<apiLimit_CONFIG>

// swagger
export interface swagger_CONFIG {
  use: boolean | true
  route: string
  info: {
    title: string
    version: string
    description: string
  }
  host: string | 'auto'
  apiKey: {
    type: 'apiKey'
    name: string | 'Authorization'
    in: string | 'header'
  }
  tags?: Array<{ name: string, description: string }>
  externalDocs?: { description: string, url: string }
}
// export interface swagger_DTYPE extends CONFIG_DTYPE<any> {
//   dev: swagger_CONFIG
//   prod: Partial<Omit<swagger_CONFIG, 'use'>> & Pick<swagger_CONFIG, 'use'>
// }

// alioss
export interface aliOss_CONFIG {
  region: string
  accessKeyId: string
  accessKeySecret: string
  bucket: string
}
// export type aliOss_DTYPE = CONFIG_DTYPE<aliOss_CONFIG>
