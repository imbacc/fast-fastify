import type { NumberSchema, StringSchema, ArraySchema, ObjectSchema, JSONSchema } from 'fluent-json-schema'
import type { items_DTYPE, enum_DTYPE, prop_param, append_param, createProp_param, n2_param } from '#/schemaReduce'
import type { attr_DTYPE, entity_DTYPE } from '#/entity'

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

export class schemaReduce<T extends entity_DTYPE> {
  public entity!: T
  private keys: Array<keyof T> = []
  public appendVo: entity_DTYPE = {}
  public appendVoKeys: Array<keyof entity_DTYPE> = []
  private updateProp: append_param = {}

  constructor(entity: T, keys: Array<keyof T>) {
    if (entity.vo) {
      entity.vo = this.conVertSchema(entity.vo, Object.keys(entity.vo))
    }
    this.keys = keys
    this.entity = this.conVertSchema(entity, keys)
  }

  /**
   * 转换成schema
   * @param entity 实体对象
   * @param keys 实体对象所有键
   * @returns
   */
  private conVertSchema(entity: T, keys: Array<keyof T>): T {
    entity = this.clone(entity)
    console.log('%c [ entity ]-87', 'font-size:14px; background:#41b883; color:#ffffff;', entity)
    keys.forEach((key: keyof T) => {
      let { desc, type, n1, n2, len } = entity[key]
      let n2Val = n2
      if (len > 0 && n2 === 'max') {
        if (type === 'number') n2Val = parseInt(`${Array(len).fill(9).join('')}`)
        if (type === 'string') n2Val = len
      }
      entity[key].schema = [key as string, desc, [type, n1, n2Val as n2_param, true, null]]
    })
    return entity
  }

  /**
   * 映射出schema: prop_param 原型
   */
  private keysInProp(keys: Array<keyof T>): Array<createProp_param> {
    const list: Array<createProp_param> = []
    keys.forEach((key: keyof T) => {
      let schema = this.entity[key].schema as createProp_param
      list.push(schema)
    })
    this.appendVoKeys.forEach((key: keyof entity_DTYPE) => {
      let schema = this.appendVo[key].schema as createProp_param
      list.push(schema)
    })
    console.log('%c [ list ]-112', 'font-size:14px; background:#41b883; color:#ffffff;', list)
    this.appendVo = {}
    this.appendVoKeys = []
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

  private clone(obj: any) {
    let o: any = obj instanceof Array ? [] : {}
    for (let k in obj) {
      o[k] = Object.prototype.toString.call(obj[k]) === '[object Object]' ? this.clone(obj[k]) : obj[k]
    }
    return o
  }

  /**
   * 追加 自定义字段 相当于VO
   */
  appendSchemaVo(appendVo: entity_DTYPE | { [key: string]: entity_DTYPE } | attr_DTYPE | Array<attr_DTYPE | entity_DTYPE>) {
    appendVo = this.clone(appendVo)
    const append_type = appendVo.constructor.name.toString()

    // as entity_DTYPE 类型
    if (append_type === 'vo') {
      appendVo = appendVo as entity_DTYPE
      const appendVoKeys = Object.keys(appendVo)
      for (let i = 0, j = appendVoKeys.length; i < j; i++) {
        const key = appendVoKeys[i]
        const schema = Object.assign([], appendVo[key].schema as createProp_param)
        if (this.keys.some((s: keyof T) => s === key)) {
          schema.splice(0, 1, `vo_${schema[0]}`)
          appendVo[key].schema = schema
        }
      }
      this.appendVoKeys = Object.keys(appendVo)
      this.appendVo = this.conVertSchema(appendVo as entity_DTYPE as T, this.appendVoKeys)
    } else if (append_type === 'Object') {
      const name = (appendVo as attr_DTYPE).schema?.[0] || ''
      // name === '' 表示 { [key: string]: entity_DTYPE } 类型 否则 attr_DTYPE 类型
      const vo = Object.assign({}, name === '' ? appendVo : { [name as string]: appendVo })
      this.appendVoKeys = Object.keys(vo)
      this.appendVo = this.conVertSchema(vo as entity_DTYPE as T, this.appendVoKeys)
    } else {
      let vo: entity_DTYPE = {}
      ;(appendVo as Array<attr_DTYPE | entity_DTYPE>).forEach((info: attr_DTYPE | entity_DTYPE) => {
        const name = (info as attr_DTYPE).schema?.[0] || ''
        if (name === '') {
          vo = Object.assign({}, info) as entity_DTYPE
        } else {
          vo[name] = info as attr_DTYPE
        }
      })
      console.log('%c [ Object.keys(vo) ]-202', 'font-size:14px; background:#41b883; color:#ffffff;', Object.keys(vo))
      this.appendVoKeys = Object.keys(vo)
      this.appendVo = this.conVertSchema(vo as entity_DTYPE as T, this.appendVoKeys)
      console.log('%c [ this.appendVo ]-193', 'font-size:14px; background:#41b883; color:#ffffff;', this.appendVo)
      console.log('%c [ this.appendVoKeys ]-194', 'font-size:14px; background:#41b883; color:#ffffff;', this.appendVoKeys)
    }
    return this
  }

  /**
   * 更新schema原有定义 长度限制或者类型限制
   */
  updateSchema(update: append_param) {
    this.updateProp = update
    console.log('%c [ this.updateProp ]-145', 'font-size:14px; background:#41b883; color:#ffffff;', this.updateProp)
  }
}
