export type APIResultCode_DTYPE = Record<string, [number, string]>

export interface APIResultful_DTYPE {
  [key: string]: any
  code: number
  msg: string
  data: any
}
