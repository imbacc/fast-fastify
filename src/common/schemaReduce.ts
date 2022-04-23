import type { NumberSchema, StringSchema, ArraySchema, ObjectSchema, JSONSchema } from 'fluent-json-schema'
import type { items_DTYPE, enum_DTYPE, prop_param, append_param, createProp_param } from '#/schemaReduce'
import type { entity_DTYPE, attr_DTYPE } from '#/entity'

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

export function createProp(name: string, desc: string, propParmam: prop_param, object?: ObjectSchema): JSONSchema {
  if (!object) object = createObject()
  const [type, n1, n2, required, append] = propParmam
  let prop: any = null
  if (type === 'number' || type === 'string' || type === 'object') prop = typeFunction[type](n1 as number, n2 as number)
  if (type === 'array') prop = typeFunction.array(n1 as number, n2 as keyof items_DTYPE)
  if (type === 'enum') prop = typeFunction.enum(n1 as Array<keyof enum_DTYPE>, n2 as enum_DTYPE)
  if (append) {
    Object.entries(append).forEach(([key, val]) => {
      prop = val ? prop[key](val) : prop[key]()
    })
  }
  if (required) prop = prop.required()
  return object.prop(name, prop).description(desc)
}

export function reduceProp(...args: any): JSONSchema {
  const out_schema = args
    .reduce((t: any, v: any) => {
      // @ts-ignore
      return createProp.call({}, ...v, t)
    }, createObject())
    .valueOf()
  delete out_schema.$schema
  return out_schema
}

// 复用数组
export function arrRepeta(arr: createProp_param, n1: any, n2: any) {
  const _arr = [...arr]
  _arr[1] = n1
  _arr[2] = n2
  return _arr
}

type Array_attr_DTYPE = { [key in string]: attr_DTYPE }

export class schemaReduce<T extends entity_DTYPE> {
  private entity!: T
  private keys: Array<keyof T> = []
  private appendVo: Array<Array_attr_DTYPE> = []
  private updateProp: append_param = {}

  constructor(entity: T, keys: Array<keyof T>) {
    this.entity = entity
    this.keys = keys
  }

  // getSuper() {
  //   return this
  // }

  /**
   * 映射出schema: prop_param 原型
   */
  private keysInProp(keys: Array<keyof T>): Array<prop_param> {
    const list: Array<prop_param> = []
    keys.forEach((key: keyof T) => {
      let schema = this.entity[key].schema as prop_param
      schema.push()
      list.push(schema)
    })
    return list
  }

  /**
   * 所有字段schema
   */
  allSchema(): JSONSchema {
    return reduceProp(...this.keysInProp(this.keys))
  }

  /**
   * 只有选取的字段
   * @param key 字符串或字符串集合
   */
  pickSchema(key: keyof T | Array<keyof T> | never): JSONSchema | null {
    if (!key) return null
    let keys = []
    if (typeof key === 'string') {
      keys = this.keys.filter((f) => key === f)
    } else {
      keys = this.keys.filter((f) => (key as Array<keyof T>).includes(f))
    }
    return reduceProp(...this.keysInProp(keys))
  }

  /**
   * 只有排除的字段
   * @param key 字符串或字符串集合
   */
  omitSchema(key: keyof T | Array<keyof T>): JSONSchema | null {
    if (!key) return null
    let keys = []
    if (typeof key === 'string') {
      keys = this.keys.filter((f) => f !== key)
    } else {
      keys = this.keys.filter((f) => !(key as Array<keyof T>).includes(f))
    }
    return reduceProp(...this.keysInProp(keys))
  }

  /**
   * 追加 自定义字段 相当于VO
   */
  appendSchemaVo(appendVo: Array<Array_attr_DTYPE>) {
    this.appendVo = appendVo
    console.log('%c [ this.appendVo ]-137', 'font-size:14px; background:#41b883; color:#ffffff;', this.appendVo)
  }

  /**
   * 更新schema原有定义 长度限制或者类型限制
   */
  updateSchema(update: append_param) {
    this.updateProp = update
    console.log('%c [ this.updateProp ]-145', 'font-size:14px; background:#41b883; color:#ffffff;', this.updateProp)
  }
}
