/* automatically generated by MySQLtoTS */
import type { n1_param, n2_param, type_param, createProp_param } from '#/schemaReduce'

export interface attr_DTYPE {
  desc: string
  type: type_param
  n1: n1_param
  n2: n2_param | 'max'
  len: number
  schema?: createProp_param
}

export interface entity_DTYPE {
  [key: string]: attr_DTYPE
  vo?: any
  // vo?: {
  //   [key: string]: attr_DTYPE
  // } & any
}

export type appendVo_DTYPE = entity_DTYPE | { [key: string]: entity_DTYPE } | attr_DTYPE | Array<attr_DTYPE | entity_DTYPE>

export interface testInfo_DTYPE extends Required<entity_DTYPE> {
  id: attr_DTYPE
  name: attr_DTYPE
  text: attr_DTYPE
}
