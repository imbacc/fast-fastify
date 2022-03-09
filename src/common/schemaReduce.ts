import schema from 'fluent-json-schema'

const _number = schema.number()
const _string = schema.string()
const _array = schema.array()
const _object = schema.object()

const items_DTYPE = {
  number: number
}

//
const items_type = {
  number: _number,
  string: _string,
  array: _array,
  object: _object
}

// 基本类型生成
const _type = {
  number: (n1: number, n2: number) => _number.minimum(n1).maximum(n2),
  string: (n1: number, n2: number) => _string.minLength(n1).maxLength(n2),
  array: (n1: number, n2: number) => _array.maxItems(n1).items(items_type[n2]),
  object: (n1: number, n2: number) => _object.minProperties(n1).maxProperties(n2),
  enum: (n1: number, n2: number) => schema.enum(n1).default(n2)
}

// 创建初始头对象
const create_object = () => schema.object()

// 根据格式创建基本schema, append做额外延续内容。
const create_prop = (name, desc, [type, n1, n2, required, append], object) => {
  if (!object) object = create_object()
  let prop = _type[type](n1, n2)
  if (append) {
    const append_type = toString.call(append)
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
