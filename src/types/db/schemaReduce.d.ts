import type { NumberSchema, StringSchema, ArraySchema, ObjectSchema, JSONSchema } from 'fluent-json-schema'

export type items_DTYPE = {
  number: NumberSchema
  string: StringSchema
  array: ArraySchema
  object: ObjectSchema
}
export type enum_DTYPE = Record<string, string>
export type type_param = keyof items_DTYPE | 'enum'
export type n1_param = number | Array<keyof enum_DTYPE>
export type n2_param = number | keyof items_DTYPE | enum_DTYPE
export type append_param = { [key in string]: JSONSchema | Object }
export type prop_param = [type_param, n1_param, n2_param, boolean, append_param | null]
export type createProp_param = [name: string, desc: string, propParmam: prop_param, object?: ObjectSchema]
