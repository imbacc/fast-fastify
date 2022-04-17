import type { NumberSchema, StringSchema, ArraySchema, ObjectSchema } from 'fluent-json-schema'

export type items_DTYPE = {
  number: NumberSchema
  string: StringSchema
  array: ArraySchema
  object: ObjectSchema
}
export type enum_DTYPE = { [key in string]: string }
export type type_param = keyof items_DTYPE | 'enum'
export type n1_param = number | Array<keyof enum_DTYPE>
export type n2_param = number | keyof items_DTYPE | enum_DTYPE
export type required_param = boolean
export type append_param = Array<string> | Object
export type prop_param = [type_param, n1_param, n2_param, required_param, append_param]
export type createProp_param = [name: string, desc: string, propParmam: prop_param, object: ObjectSchema]
