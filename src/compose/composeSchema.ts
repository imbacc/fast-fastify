import type {
  ObjectSchema,
  JSONSchema,
} from 'fluent-json-schema'
import type { string_DTYPE, number_DTYPE, integer_DTYPE, array_DTYPE, object_DTYPE, props_DTYPE } from '#/compose/entity'

import schema from 'fluent-json-schema'

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
    this.keys = keys
    this.keysVo = keysVo
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
      schema = this.createProps(key, entity[key], schema)
    })
    return schema as JSONSchema
  }

  /**
   * 根据实体的定义创建schema属性
   * @param name 属性名
   * @param attribute 属性类型
   * @param object 追加
   * @returns
   */
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
  getSchema(targetSchema?: JSONSchema) {
    if (!targetSchema) targetSchema = this.schema
    const outSchema = targetSchema.valueOf()
    delete (outSchema as any).$schema
    return outSchema
  }

  /**
   * vo与实体合并
   */
  allSchema() {
    const schema = this.clone(this.schema)
    const schemaVo = this.clone(this.schemaVo)
    return this.getSchema(Object.assign(schema, schemaVo) as any)
  }

  /**
   * 只有选取的字段
   * @param key 字符串或字符串集合
   */
  pickSchema(key: keyof T | Array<keyof T>, targetEntity?: T) {
    return this.handleSchema<T>(key, this.keys, targetEntity || this.entity, true)
  }

  /**
   * 只有选取的字段Vo
   * @param key 字符串或字符串集合
   */
  pickSchemaVo(key: keyof Y | Array<keyof Y>, targetEntityVo?: Y) {
    return this.handleSchema<Y>(key, this.keysVo, targetEntityVo || this.entityVo, true)
  }

  /**
   * 只有排除的字段
   * @param key 字符串或字符串集合
   */
  omitSchema(key: keyof T | Array<keyof T>, targetEntity?: T) {
    return this.handleSchema<T>(key, this.keys, targetEntity || this.entity, false)
  }

  /**
   * 只有排除的字段
   * @param key 字符串或字符串集合
   */
  omitSchemaVo(key: keyof Y | Array<keyof Y>, targetEntityVo?: Y) {
    return this.handleSchema<Y>(key, this.keysVo, targetEntityVo || this.entityVo, false)
  }

  /**
   * 追加schema
   */
  appendSchema(append: string_DTYPE | number_DTYPE | integer_DTYPE | array_DTYPE | object_DTYPE) {

  }

  // 复用执行
  private handleSchema<P>(key: keyof P | Array<keyof P>, keyList: Array<keyof P>, targetEntity: P, pick: boolean) {
    if (typeof key === 'string') key = [key]
    const keys = keyList.filter((f) => (key as Array<keyof P>).includes(f) === pick)
    const schema = this.conVertSchema(targetEntity as unknown as (T | Y), keys as unknown as (Array<keyof T> | Array<keyof Y>))
    return this.getSchema(schema)
  }

  // 克隆
  private clone(obj) {
    const o = Array.isArray(obj) ? [] : {}
    for (const k in obj) {
      o[k] = Object.prototype.toString.call(obj[k]) === '[object Object]' ? this.clone(obj[k]) : obj[k]
    }
    return o
  }
}
