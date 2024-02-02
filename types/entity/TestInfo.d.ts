import type { string_DTYPE, number_DTYPE, integer_DTYPE, array_DTYPE, object_DTYPE, entity_DTYPE } from '../compose/entity'

export interface testInfo_DTYPE {
  id: integer_DTYPE
  name?: string_DTYPE
  text?: string_DTYPE
}

export interface testInfoTarget_DTYPE {
  id: number
  name: string
  text: string
}
