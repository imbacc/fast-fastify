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

type enum_DTYPE = { [key in string]: string }
type type_param = keyof items_DTYPE | 'enum'
type n1_param = number | Array<keyof enum_DTYPE>
type n2_param = number | keyof items_DTYPE | enum_DTYPE
type required_param = boolean
type append_param = Array<string> | Object
type prop_param = [type_param, n1_param, n2_param, required_param, append_param]
type createProp_param = [name: string, desc: string, propParmam: prop_param, object: ObjectSchema]

class schemaReduce {
  private items: items_DTYPE = {
    number: _number,
    string: _string,
    array: _array,
    object: _object
  }

  private number(n1: number, n2: number): NumberSchema {
    return _number.minimum(n1).maximum(n2)
  }

  private string(n1: number, n2: number): StringSchema {
    return _string.minLength(n1).maxLength(n2)
  }

  private array(n1: number, n2: keyof items_DTYPE): ArraySchema {
    return _array.maxItems(n1).items(this.items[n2])
  }

  private object(n1: number, n2: number): ObjectSchema {
    return _object.minProperties(n1).maxProperties(n2)
  }

  private enum(n1: Array<keyof enum_DTYPE>, n2: enum_DTYPE): JSONSchema {
    return schema.enum(n1).default(n2)
  }

  // 创建初始头对象
  private createObject(): ObjectSchema {
    return schema.object()
  }

  createProp(name: string, desc: string, propParmam: prop_param, object: ObjectSchema) {
    const [type, n1, n2, required, append] = propParmam
    if (!object) object = this.createObject()
    let prop: any = null
    if (type === 'number' || type === 'string' || type === 'object') prop = this[type](n1 as number, n2 as number)
    if (type === 'array') prop = this.array(n1 as number, n2 as keyof items_DTYPE)
    if (type === 'enum') prop = this.enum(n1 as Array<keyof enum_DTYPE>, n2 as enum_DTYPE)
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

  reduce_prop(...args: any) {
    const out_schema = args
      .reduce((t: any, v: any) => {
        console.log('%c [ t ]-80', 'font-size:13px; background:#41b883; color:#ffffff;', t)
        console.log('%c [ v ]-80', 'font-size:13px; background:#41b883; color:#ffffff;', v)
        // this.createProp.call(this, ...v, t), this.createObject()
      })
      .valueOf()
    console.log('%c [ out_schema ]-80', 'font-size:13px; background:#41b883; color:#ffffff;', out_schema)
    delete out_schema.$schema
    return out_schema
  }

  // 复用数组
  arrRepeta(arr: createProp_param, n1: any, n2: any) {
    const _arr = [...arr]
    _arr[1] = n1
    _arr[2] = n2
    return _arr
  }
}

export default schemaReduce
