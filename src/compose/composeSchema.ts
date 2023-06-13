import type {
  ObjectSchema,
  JSONSchema,
} from 'fluent-json-schema'
import type { string_DTYPE, number_DTYPE, integer_DTYPE, array_DTYPE, object_DTYPE, props_DTYPE } from '#/compose/entity'

import schema from 'fluent-json-schema'

export function createSchema<T>(entity: T) {
  console.log('%c [ entity ]-49', 'font-size:14px; background:#41b883; color:#ffffff;', entity)
  // return object.prop(name, prop).description(desc)
}

export class ComposeSchema<T, Y> {
  public entity: T
  public entityVo: Y
  public schema: JSONSchema
  public schemaVo: JSONSchema
  public keys: Array<keyof T> = []
  public keysVo: Array<keyof Y> = []
  public appendVo = {}
  public appendVoKeys: Array<string> = []
  // private updateProp = {}

  constructor(entity: T, entityVo: Y, keys: Array<keyof T>, keysVo: Array<keyof Y>) {
    this.entity = entity
    this.entityVo = entityVo
    // this.keys = keys
    // this.keysVo = keysVo
    this.schema = this.conVertSchema(entity, keys)
    this.schemaVo = this.conVertSchema(entityVo, keysVo)
  }

  /**
   * 转换成schema
   * @param entity 实体对象
   * @param keys 实体对象所有键
   * @returns
   */
  conVertSchema(entity: T | Y, keys: Array<keyof T> | Array<keyof Y>): JSONSchema {
    let schema
    keys.forEach((key) => {
      if (schema) {
        schema = this.createProps(key, entity[key], schema as ObjectSchema)
      } else {
        schema = this.createProps(key, entity[key])
      }
    })
    return schema as JSONSchema
  }

  createProps(name: string, attribute: string_DTYPE | number_DTYPE | integer_DTYPE | array_DTYPE | object_DTYPE, object?: ObjectSchema): JSONSchema {
    if (!object) object = schema.object()
    let props: props_DTYPE = schema.object()
    if (!attribute.hidden) {
      if (attribute.type === 'string') {
        props = schema.string()
        const attr = attribute as string_DTYPE
        if (typeof attr.minLength === 'number') props = props.minLength(attr.minLength)
        if (typeof attr.maxLength === 'number' && (attr.maxLength as unknown as string) !== 'max') props = props.maxLength(attr.maxLength)
        if (attr.defaultFormat) props = props.format(attr.defaultFormat as any)
      } else if (attribute.type === 'number' || attribute.type === 'integer') {
        props = attribute.type === 'number' ? schema.number() : schema.integer()
        const attr = attribute as number_DTYPE
        if (typeof attr.minimum === 'number') props = props.minimum(attr.minimum)
        if (typeof attr.maximum === 'number' && (attr.maximum as unknown as string) !== 'max') props = props.maximum(attr.maximum)
      } else if (attribute.type === 'array') {
        props = schema.array()
        const attr = attribute as array_DTYPE
        if (typeof attr.minItems === 'number') props = props.minItems(attr.minItems)
        if (typeof attr.maxItems === 'number' && (attr.maxItems as unknown as string) !== 'max') props = props.maxItems(attr.maxItems)
        if (attr.item) props = props.items(attr.item)
      } else if (attribute.type === 'object') {
        props = schema.object()
        const attr = attribute as object_DTYPE
        if (typeof attr.minProperties === 'number') props = props.minProperties(attr.minProperties)
        if (typeof attr.maxProperties === 'number' && (attr.maxProperties as unknown as string) !== 'max') props = props.maxProperties(attr.maxProperties)
        if (attr.extend) props.extend(attr.extend)
      }
    }
    if (attribute.appendSchema) {
      Object.entries(attribute.appendSchema).forEach(([key, val]) => {
        props = val ? props[key](val) : props[key]()
      })
    }
    if (attribute.required) props = props.required()
    return object.prop(name, props).description(attribute.desc)
  }

  /**
   * 获取schema valueof
   * target 传入 entity或entityVo
   */
  getSchema(targetSchema?: T | Y) {
    const cloneSchema = this.clone(targetSchema || this.schema) as JSONSchema
    const outSchema = cloneSchema.valueOf()
    delete (outSchema as any).$schema
    console.log('%c [ outSchema ]-96', 'font-size:14px; background:#41b883; color:#ffffff;', outSchema)
    return outSchema
  }

  private clone(obj) {
    const o = Array.isArray(obj) ? [] : {}
    for (const k in obj) {
      o[k] = Object.prototype.toString.call(obj[k]) === '[object Object]' ? this.clone(obj[k]) : obj[k]
    }
    return o
  }
}
