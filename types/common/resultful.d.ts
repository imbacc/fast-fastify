export interface apiResultful_DTYPE<T = any> {
  [key: string]: any
  code: number
  msg: string
  data: T
}
