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
  // schema类型
  type: keyof types_DTYPE
  // 描述
  description?: string
  // 是否必填
  required?: boolean
  // 是否在composeTable和composeSchema里隐藏
  hidden?: boolean
  // 是否主键
  primaryKey?: boolean
  // 枚举
  enum?: Array<any>
  // 固定常量值
  const?: any
  // 固定默认值
  default?: any
  // // not 不是给出的约束即可
  // not?: keyof types_DTYPE
  // // allOf 必须满足所有的约束才算通过
  // allOf?: Array<attribute_DTYPE>
  // // anyOf 必须满足任意一个或多个约束才算通过
  // anyOf?: Array<attribute_DTYPE>
  // // oneOf 必须满足任意一个约束才算通过
  // oneOf?: Array<attribute_DTYPE>
  // // 布尔值可用于显式设置readOnly
  // readOnly?: boolean
  // // 布尔值可用于显式设置writeOnly
  // writeOnly?: boolean
  // // 该布尔值可用于显式设置deprecated
  // deprecated?: boolean
}

// string用于文本字符串 可以使用 minLength 和 maxLength 关键字来限制字符串的长度。对于这两个关键字，该值必须是非负数。
export type string_DTYPE = {
  type: 'string'
  // 字符最小长度
  minLength?: number
  // 字符最大长度 最大长度为数据库定义长度
  maxLength?: number | 'max'
  // 默认格式化字符内容
  format?: FORMATS[keyof FORMATS]
  // 关键字用于将字符串限制为特定的正则表达式
  pattern?: string | RegExp
  // 编码进行解码
  contentEncoding?: string
  // 实例的媒体类型
  contentMediaType?: string
  // 追加原有规则
  // appendOriginSchema: StringSchema
} & entity_DTYPE

// number数字类型 数字的范围是使用 minimum 和 maximum 关键字的组合指定的 （或 exclusiveMinimum 和 exclusiveMaximum 用于表示排他范围）
export type number_DTYPE = {
  type: 'number'
  // 数字最小值 x ≥ minimum
  minimum?: number
  // 数字最大值 x ≤ maximum 最大值默认为数据库定义长度 例: 6位 -> 999999
  maximum?: number | 'max'
  // x > exclusiveMinimum
  exclusiveMinimum?: number
  // x < exclusiveMaximumx
  exclusiveMaximum?: number
  // 使用multipleOf关键字将数字限制为给定数字的倍数 。它可以设置为任何正数。
  multipleOf?: number
  // 追加原有规则
  // appendOriginSchema: NumberSchema
} & entity_DTYPE

// integer用于整数 
export type integer_DTYPE = {
  type: 'integer'
  // 追加原有规则
  // appendOriginSchema: IntegerSchema
} & Omit<number_DTYPE, 'type'>

export type array_DTYPE = {
  // 数组指向类型
  items: Array<Record<string, attribute_DTYPE>>
  // 数组最小长度
  minItems?: number
  // 数组最大长度
  maxItems?: number | 'max'
  // // 元素都满足要求 只有在items关键字的值为一组有效的JSON Schema的时候，才会进行校验
  // additionalItems: Array<attribute_DTYPE> | boolean
  // // 至少有一个元素能够通过该关键字指定的JSON Schema的校验，整个数组才算通过校验
  // contains?: attribute_DTYPE | boolean
  // // 所有元素都具有唯一性时，才能通过校验
  // uniqueItems?: boolean
  // 追加原有规则
  // appendOriginSchema: ArraySchema
} & entity_DTYPE

export type object_DTYPE = {
  // 目标对象object
  target: Record<string, attribute_DTYPE>
  // 对象里的最小属性数量
  minProperties?: number
  // 对象里的最大属性数量
  maxProperties?: number | 'max'
  // 进行验证仅适用于与“properties”中的任何名称
  additionalProperties?: attribute_DTYPE | boolean
  // 继承
  extend?: object_DTYPE
  // only: string[]
  // without: string[]
  // 追加原有规则
  // appendOriginSchema: ObjectSchema
} & entity_DTYPE
