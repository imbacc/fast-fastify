import type { string_DTYPE, number_DTYPE, integer_DTYPE, array_DTYPE, object_DTYPE, entity_DTYPE } from '../compose/entity'

export interface TestInfo_DTYPE {
  id: integer_DTYPE
  name?: string_DTYPE
  text?: string_DTYPE
}
export interface TestInfoTarget_DTYPE {
  id: number
  name: string
  text: string
}
