// CONFIG
// export interface CONFIG<T, P> {
//   dev: T
//   prod: P | T // P extends T ? P : T
//   // dev: T extends infer R ? R : T
//   // prod: (P | T) extends infer R ? R : T
// }
export interface CONFIG<T> {
  dev: T
  prod: T
}

export type CONFIG_DTYPE = keyof CONFIG<any>

// checkAuth
type checkAuthType = Array<string>
export interface checkAuth_DTYPE extends CONFIG<checkAuthType> {}

//listenConfig
export type listenConfigType = {
  port: number
  ip: string
  queue: number
}
export interface listenConfig_DTYPE extends CONFIG<listenConfigType> {}

// jwtConfig
export type jwtConfigType = string
export interface jwtConfig_DTYPE extends CONFIG<jwtConfigType> {}

// mysqlConfig
export type mysqlConfigType = {
  host: string | '127.0.0.1'
  user: string | 'root'
  password: string | 'root'
  port: number | 3306
  database: string
}
export interface mysqlConfig_DTYPE extends CONFIG<mysqlConfigType> {}

// redisConfig
export type redisConfigType = Pick<mysqlConfigType, 'host' | 'port'>
export interface redisConfig_DTYPE extends CONFIG<redisConfigType> {}

// apiTimeConfig
export type apiTimeConfigType = {
  open: boolean
  time: number
  count: number
}
export interface apiTimeConfig_DTYPE extends CONFIG<apiTimeConfigType> {}

// swaggerConfig
export type swaggerConfigType = {
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
  tags?: Array<{ name: string; description: string }>
  externalDocs?: { description: string; url: string }
}
type swaggerConfigType_Prod_omit = Omit<swaggerConfigType, 'use'>
type swaggerConfigType_Prod_pick = Pick<swaggerConfigType, 'use'>
export interface swaggerConfig_DTYPE extends CONFIG<any> {
  dev: swaggerConfigType
  prod: Partial<swaggerConfigType_Prod_omit> & swaggerConfigType_Prod_pick
}

// method
export const enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}
