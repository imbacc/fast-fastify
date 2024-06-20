import type {
  JSONSchema,
  ObjectSchema,
} from 'fluent-json-schema'
import type { string_DTYPE, number_DTYPE, array_DTYPE, object_DTYPE, props_DTYPE, attribute_DTYPE } from '#/compose/entity'

import { convertFactory } from './composeFactory'
import schema from 'fluent-json-schema'

export class ComposeSchema<T> {
  private entity: T
  private schema: ObjectSchema
  private keys: Array<keyof T> = []

  constructor(entity: T, keys: Array<keyof T>) {
    this.entity = entity
    this.keys = keys
    this.schema = this.conVertSchema(entity, keys)
  }

  /**
   * 转换成实体schema
   * @param entity 实体对象
   * @param keys 实体对象所有键
   * @returns
   */
  conVertSchema(entity: T | ObjectSchema, keys: Array<keyof T> | Array<string>): ObjectSchema {
    entity = this.clone(entity) as T | ObjectSchema
    let schema
    keys.forEach((key) => {
      schema = this.createProps(key, entity[key], schema)
    })
    return schema as ObjectSchema
  }

  /**
   * 根据实体的定义创建schema属性
   * @param name 属性名
   * @param attribute 属性类型
   * @param object 追加
   * @param returnProp 跳过object.prop创建
   * @returns
   */
  createProps(name: string, attribute: attribute_DTYPE, object?: ObjectSchema): ObjectSchema {
    if (!object) object = schema.object()
    if (attribute.hidden) return object

    let props: props_DTYPE = schema.object()
    if (attribute.type === 'string') {
      props = schema.string()
      const attr = attribute as string_DTYPE
      if (typeof attr.minLength === 'number') props = props.minLength(attr.minLength)
      if (typeof attr.maxLength === 'number' && (attr.maxLength as unknown as string) !== 'max') props = props.maxLength(attr.maxLength)
      if (attr.format) props = props.format(attr.format)
      if (attr.pattern) props = props.pattern(attr.pattern)
      if (attr.contentEncoding) props = props.contentEncoding(attr.contentEncoding)
      if (attr.contentMediaType) props = props.contentMediaType(attr.contentMediaType)
      if (attr.enum) props = props.enum(attr.enum)
      if (attr.const) props = props.const(attr.const)
      if (attr.default) props = props.default(attr.default)
      if (attr.required) props = props.required()
      return object.prop(name, props).description(attr?.description || '')
    } else if (attribute.type === 'number' || attribute.type === 'integer') {
      props = attribute.type === 'number' ? schema.number() : schema.integer()
      const attr = attribute as number_DTYPE
      if (typeof attr.minimum === 'number') props = props.minimum(attr.minimum)
      if (typeof attr.maximum === 'number' && (attr.maximum as unknown as string) !== 'max') props = props.maximum(attr.maximum)
      if (attr.exclusiveMinimum) props.exclusiveMinimum(attr.exclusiveMinimum)
      if (attr.exclusiveMaximum) props.exclusiveMaximum(attr.exclusiveMaximum)
      if (attr.multipleOf) props.multipleOf(attr.multipleOf)
      if (attr.enum) props = props.enum(attr.enum)
      if (attr.const) props = props.const(attr.const)
      if (attr.default) props = props.default(attr.default)
      if (attr.required) props = props.required()
      return object.prop(name, props).description(attr?.description || '')
    } else if (attribute.type === 'array') {
      let newArr = schema.array()
      const attr = attribute as array_DTYPE
      if (typeof attr.minItems === 'number') newArr = newArr.minItems(attr.minItems)
      if (typeof attr.maxItems === 'number' && (attr.maxItems as unknown as string) !== 'max') newArr = newArr.maxItems(attr.maxItems)
      if (attr.items) {
        const newArrObjList: Array<ObjectSchema> = []
        attr.items.forEach((item) => {
          const newObj = this.conVertSchema(item as any, Object.keys(item))
          newArrObjList.push(newObj)
        })
        newArr = newArr.items(newArrObjList)
      }
      if (attr.enum) props = props.enum(attr.enum)
      if (attr.const) props = props.const(attr.const)
      if (attr.default) props = props.default(attr.default)
      if (attr.required) props = props.required()
      object.prop(name, props).description(attr?.description || '')
      return object.prop(name, newArr).description(attribute?.description || '')
    } else if (attribute.type === 'object') {
      let newObj = schema.object()
      const attr = attribute as object_DTYPE
      if (typeof attr.minProperties === 'number') newObj = newObj.minProperties(attr.minProperties)
      if (typeof attr.maxProperties === 'number' && (attr.maxProperties as unknown as string) !== 'max') newObj = newObj.maxProperties(attr.maxProperties)
      if (attr.target) {
        newObj = this.conVertSchema(attr.target as any, Object.keys(attr.target))
        if (attr.enum) props = props.enum(attr.enum)
        if (attr.const) props = props.const(attr.const)
        if (attr.default) props = props.default(attr.default)
        if (attr.required) props = props.required()
        // 第一次赋予外面的属性定义
        object.prop(name, props).description(attr?.description || '')
        // 第二次替换里面的新的属性定义
        return object.prop(name, newObj).description(attribute?.description || '')
      }
    }

    // if (attribute.appendOriginSchema) {
    //   Object.entries(attribute.appendOriginSchema).forEach(([key, val]) => {
    //     props = val ? props[key](val) : props[key]()
    //   })
    // }

    return object.prop(name, props).description(attribute?.description || '')
  }

  /**
   * 获取schema valueof
   * target 传入 entity或entityVo
   */
  getSchema(targetSchema?: ObjectSchema): JSONSchema {
    if (!targetSchema) targetSchema = this.clone(this.schema) as ObjectSchema
    const outSchema = targetSchema.valueOf()
    delete (outSchema as any).$schema
    return outSchema as JSONSchema
  }

  /**
   * 合并继承
   */
  // extendSchema(schema: JSONSchema) {
  //   // const appendSchema = this.conVertSchema(schema)
  //   return this.schema
  // }

  /**
   * 只有选取的字段
   * @param key 字符串或字符串集合
   */
  pickEntitySchema(key: keyof T | Array<keyof T>, targetEntity?: T): ObjectSchema {
    return this.handleSchema<T>(key, this.keys, targetEntity || this.entity, true).schema
  }

  /**
   * 只有排除的字段
   * @param key 字符串或字符串集合
   */
  omitEntitySchema(key: keyof T | Array<keyof T>, targetEntity?: T): ObjectSchema {
    return this.handleSchema<T>(key, this.keys, targetEntity || this.entity, false).schema
  }

  /**
   * 只有选取的字段
   * @param key 字符串或字符串集合
   */
  pickSchema(key: keyof T | Array<keyof T>, targetEntity?: T): object {
    return this.handleSchema<T>(key, this.keys, targetEntity || this.entity, true).outSchema
  }

  /**
   * 只有排除的字段
   * @param key 字符串或字符串集合
   */
  omitSchema(key: keyof T | Array<keyof T>, targetEntity?: T): object {
    return this.handleSchema<T>(key, this.keys, targetEntity || this.entity, false).outSchema
  }

  /**
   * 追加schema
   */
  appendSchema(append: Record<string, attribute_DTYPE>, targetSchema?: ObjectSchema): object {
    const schema = this.clone(targetSchema || this.schema) as ObjectSchema
    const keys = Object.keys(append)
    const appendSchema = this.conVertSchema(append as any, keys as any)
    const newschema = schema.extend(appendSchema) as ObjectSchema
    return this.getSchema(newschema)
  }

  /**
   * 修改schema对象属性值
   */
  changeSchema(append: Record<string, Partial<attribute_DTYPE>>): object {
    const schema = this.clone(this.schema) as ObjectSchema
    const schemaValue = this.getSchema(schema) as unknown as { type: string, properties: object }
    const keys = Object.keys(append)
    keys.forEach((key) => {
      append[key].type = append[key].type || schemaValue.properties[key].type
      append[key].description = append[key].description || schemaValue.properties[key].description
    })
    const appendValue = this.conVertSchema(append as any, keys as any)
    const newSchema = schema.extend(appendValue) as ObjectSchema
    return this.getSchema(newSchema)
  }

  // 复用执行
  private handleSchema<P>(key: keyof P | Array<keyof P>, keyList: Array<keyof P>, targetEntity: P, pick: boolean) {
    if (typeof key === 'string') key = [key]
    const keys = keyList.filter((f) => (key as Array<keyof P>).includes(f) === pick)
    const schema = this.conVertSchema(targetEntity as unknown as (T), keys as unknown as (Array<keyof T>))
    return { schema, outSchema: this.getSchema(schema) }
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
