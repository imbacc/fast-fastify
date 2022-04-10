import type { NumberSchema, StringSchema, ArraySchema, ObjectSchema, JSONSchema } from 'fluent-json-schema'

import schema from 'fluent-json-schema'

const _number = schema.number()
const _string = schema.string()
const _array = schema.array()
const _object = schema.object()

type items_DTYPE = {
  number: NumberSchema
  string: StringSchema
  array: ArraySchema
  object: ObjectSchema
}

//
const items: items_DTYPE = {
  number: _number,
  string: _string,
  array: _array,
  object: _object
}

type typeFun_DTYPE = {
  number(n1: number, n2: number): NumberSchema
  string(n1: number, n2: number): StringSchema
  array(n1: number, n2: keyof items_DTYPE): JSONSchema
  object(n1: number, n2: number): ObjectSchema
  // enum(n1: Array<keyof enum_DTYPE>, n2: enum_DTYPE): JSONSchema
}

type enum_DTYPE = { [key in string]: string }
// 基本类型生成
const typeFun: typeFun_DTYPE = {
  number: (n1: number, n2: number) => _number.minimum(n1).maximum(n2),
  string: (n1: number, n2: number) => _string.minLength(n1).maxLength(n2),
  array: (n1: number, n2: keyof items_DTYPE) => _array.maxItems(n1).items(items[n2]),
  object: (n1: number, n2: number) => _object.minProperties(n1).maxProperties(n2)
  // enum: (n1: Array<keyof enum_DTYPE>, n2: enum_DTYPE) => schema.enum(n1).default(n2)
}

// 创建初始头对象
const create_object = () => schema.object()

type propParmam = [keyof typeFun_DTYPE, number | Array<keyof enum_DTYPE>, number | keyof items_DTYPE, boolean, Array<string> | Object]
// 根据格式创建基本schema, append做额外延续内容。
const create_prop = (name: string, desc: string, propParmam: propParmam, object: ObjectSchema) => {
  const [type, n1, n2, required, append] = propParmam
  if (!object) object = create_object()
  let n1_value: any = n1
  let n2_value: any = n2
  let n1_type = Object.prototype.toString.call(n1)
  if (n1_type === '[object Number]') n1_value = n1 as number
  if (n1_type === '[object Array]') n1_value = n1 as Array<keyof enum_DTYPE>
  let prop = typeFun[type as keyof typeFun_DTYPE](n1_value, n2_value)
  if (append) {
    const append_type = Object.prototype.toString.call(append)
    if (append_type === '[object Array]') {
      append.forEach((key) => (prop = prop[key]()))
    } else if (append_type === '[object Object]') {
      Object.entries(append).forEach(([key, val]) => (prop = prop[key](val)))
    }
  }
  if (required) prop = prop.required()
  return object.prop(name, prop).description(desc)
}

// reduce进行链式拼接
const reduce_prop = (...args) => {
  const out_schema = args.reduce((t, v) => create_prop.call({}, ...v, t), create_object()).valueOf()
  delete out_schema.$schema
  return out_schema
}

// 复用数组
const arr_repeta = (arr, n1, n2) => {
  const _arr = [...arr]
  _arr[1] = n1
  _arr[2] = n2
  return _arr
}

module.exports = { create_prop, reduce_prop, arr_repeta }
