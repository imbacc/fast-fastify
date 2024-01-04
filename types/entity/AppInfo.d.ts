import type { string_DTYPE, number_DTYPE, integer_DTYPE, array_DTYPE, object_DTYPE, entity_DTYPE } from '../compose/entity'

export interface AppInfo_DTYPE {
  id: integer_DTYPE
  text?: string_DTYPE
  version?: integer_DTYPE
  os?: integer_DTYPE
  ostext?: string_DTYPE
  linkurl?: string_DTYPE
  decimalTest?: number_DTYPE
}
export interface AppInfoTarget_DTYPE {
  id: number
  text: string
  version: number
  os: number
  ostext: string
  linkurl: string
  decimalTest: number
}
