import type { string_DTYPE, number_DTYPE, integer_DTYPE, array_DTYPE, object_DTYPE, entity_DTYPE } from '../compose/entity'

export interface AppInfo_DTYPE {
  id: integer_DTYPE
  linkurl?: string_DTYPE
  os?: integer_DTYPE
  ostext?: string_DTYPE
  text?: string_DTYPE
  version?: integer_DTYPE
}