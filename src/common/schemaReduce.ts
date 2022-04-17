import type { NumberSchema, StringSchema, ArraySchema, ObjectSchema, JSONSchema } from 'fluent-json-schema'
import type { items_DTYPE, enum_DTYPE, prop_param, createProp_param } from '#/schemaReduce'

import schema from 'fluent-json-schema'

const _number = schema.number()
const _string = schema.string()
const _array = schema.array()
const _object = schema.object()

const items: items_DTYPE = {
  number: _number,
  string: _string,
  array: _array,
  object: _object
}

const typeFunction = {
  number: (n1: number, n2: number): NumberSchema => _number.minimum(n1).maximum(n2),
  string: (n1: number, n2: number): StringSchema => _string.minLength(n1).maxLength(n2),
  array: (n1: number, n2: keyof items_DTYPE): ArraySchema => _array.maxItems(n1).items(items[n2]),
  object: (n1: number, n2: number): ObjectSchema => _object.minProperties(n1).maxProperties(n2),
  enum: (n1: Array<keyof enum_DTYPE>, n2: enum_DTYPE): JSONSchema => schema.enum(n1).default(n2)
}

// 创建初始头对象
const createObject = (): ObjectSchema => schema.object()

export function createProp(name: string, desc: string, propParmam: prop_param, object: ObjectSchema = createObject()) {
  const [type, n1, n2, required, append] = propParmam
  let prop: any = null
  if (type === 'number' || type === 'string' || type === 'object') prop = typeFunction[type](n1 as number, n2 as number)
  if (type === 'array') prop = typeFunction.array(n1 as number, n2 as keyof items_DTYPE)
  if (type === 'enum') prop = typeFunction.enum(n1 as Array<keyof enum_DTYPE>, n2 as enum_DTYPE)
  if (append) {
    const append_type = Object.prototype.toString.call(append)
    if (append_type === '[object Array]') {
      ;(append as Array<string>).forEach((key) => (prop = prop[key]()))
    } else if (append_type === '[object Object]') {
      Object.entries(append).forEach(([key, val]) => (prop = prop[key](val)))
    }
  }
  if (required) prop = prop.required()
  return object.prop(name, prop).description(desc)
}

export function reduceProp(...args: any) {
  const out_schema = args
    .reduce((t: any, v: any) => {
      // @ts-ignore
      createProp.call({}, ...v, t), createObject()
    })
    .valueOf()
  delete out_schema.$schema
  console.log('%c [ out_schema ]-80', 'font-size:13px; background:#41b883; color:#ffffff;', out_schema)
  return out_schema
}

// 复用数组
export function arrRepeta(arr: createProp_param, n1: any, n2: any) {
  const _arr = [...arr]
  _arr[1] = n1
  _arr[2] = n2
  return _arr
}

export class schemaReduce {
  // pick(keys: keyof test_info_DTYPE | Array<keyof test_info_DTYPE>) {
  //   console.log('%c [ keys ]-37', 'font-size:14px; background:#41b883; color:#ffffff;', keys)
  //   return new Error('Method not implemented.')
  // }
  // omit(keys: keyof test_info_DTYPE | Array<keyof test_info_DTYPE>) {
  //   console.log('%c [ keys ]-41', 'font-size:14px; background:#41b883; color:#ffffff;', keys)
  //   throw new Error('Method not implemented.')
  // }
}
