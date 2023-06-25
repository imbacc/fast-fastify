import type {
  StringSchema,
  NumberSchema,
  IntegerSchema,
  BooleanSchema,
  ObjectSchema,
  ArraySchema,
} from 'fluent-json-schema'

type FORMATS = {
  RELATIVE_JSON_POINTER: 'relative-json-pointer'
  JSON_POINTER: 'json-pointer'
  UUID: 'uuid'
  REGEX: 'regex'
  IPV6: 'ipv6'
  IPV4: 'ipv4'
  HOSTNAME: 'hostname'
  EMAIL: 'email'
  URL: 'url'
  URI_TEMPLATE: 'uri-template'
  URI_REFERENCE: 'uri-reference'
  URI: 'uri'
  TIME: 'time'
  DATE: 'date'
  DATE_TIME: 'date-time'
}

type types_DTYPE = {
  string: StringSchema
  number: NumberSchema
  integer: IntegerSchema
  boolean: BooleanSchema
  object: ObjectSchema
  array: ArraySchema
}

type props_DTYPE = StringSchema | NumberSchema | IntegerSchema | ObjectSchema | ArraySchema
type attribute_DTYPE = string_DTYPE | number_DTYPE | integer_DTYPE | array_DTYPE | object_DTYPE

type entity_DTYPE = {
  // 描述
  desc: string
  // schema类型
  type: keyof types_DTYPE
  // 是否必填
  required?: boolean
  // 是否在composeTable和composeSchema里隐藏
  hidden?: boolean
  // 是否主键
  primaryKey?: boolean
}

export type string_DTYPE = {
  // 字符最小长度
  minLength?: number
  // 字符最大长度 最大长度为数据库定义长度
  maxLength?: number | 'max'
  // 默认格式化字符内容
  defaultFormat?: FORMATS[keyof FORMATS]
  // 追加StringSchema原有规则
  appendSchema?: StringSchema
} & entity_DTYPE

export type number_DTYPE = {
  // 数字最小值
  minimum?: number
  // 数字最大值 最大值为数据库定义长度 例: 6位 -> 999999
  maximum?: number | 'max'
  // 追加NumberSchema原有规则
  appendSchema?: NumberSchema
} & entity_DTYPE

export type integer_DTYPE = {
  // 数字最小值
  minimum?: number
  // 数字最大值 最大值为数据库定义长度 例: 6位 -> 999999
  maximum?: number | 'max'
  // 追加IntegerSchema原有规则
  appendSchema?: IntegerSchema
} & entity_DTYPE

export type array_DTYPE = {
  // 数组值指向类型
  item: attribute_DTYPE
  // 数组最小长度
  minItems?: number
  // 数组最大长度
  maxItems?: number | 'max'
  // 追加ArraySchema原有规则
  appendSchema?: ArraySchema
} & entity_DTYPE

export type object_DTYPE = {
  // 继承迭代
  extend?: ObjectSchema
  // 对象里的最小属性数量
  minProperties?: number
  // 对象里的最大属性数量
  maxProperties?: number | 'max'
  // 追加ObjectSchema原有规则
  appendSchema?: ObjectSchema
} & entity_DTYPE
