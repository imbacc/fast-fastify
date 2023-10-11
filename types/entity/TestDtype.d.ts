import type { string_DTYPE, number_DTYPE, integer_DTYPE, array_DTYPE, object_DTYPE, entity_DTYPE } from '../compose/entity'

export interface TestDtype_DTYPE {
  id: integer_DTYPE
  money: number_DTYPE
  name: string_DTYPE
  date?: string_DTYPE
  json?: string_DTYPE
}
export interface TestDtypeTarget_DTYPE {
  id: number
  money: number
  name: string
  date: string
  json: string
}