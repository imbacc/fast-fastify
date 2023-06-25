import { ComposeTable } from './composeTable'
import { ComposeSchema } from './composeSchema'

function convertCamelToSnake(name: string) {
  return name.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`).slice(1)
}

function ceonvertFactory<T>(Target) {
  const ctx = new Target()
  const name = convertCamelToSnake(Target.name)

  let primaryKey = ''
  const keyList: Array<keyof T> = []
  for (const key of Object.keys(ctx)) {
    const item = ctx[key]
    if (item.hidden) continue
    if (item.primaryKey) primaryKey = key
    keyList.push(key as keyof T)
  }

  return { ctx, name, keyList, primaryKey }
}

export function tableFactory<T>(Target): ComposeTable<T> {
  const { name, keyList, primaryKey } = ceonvertFactory<T>(Target)

  const _entity = {
    [name]: class extends ComposeTable<T> {
      constructor() {
        super(name, keyList, primaryKey)
      }
    },
  }

  return new _entity[name]()
}

export function schemaFactory<T, Y>(Target, TargetVo): ComposeSchema<T, Y> {
  const { ctx, name, keyList } = ceonvertFactory<T>(Target)
  const { ctx: voCtx, keyList: voKeyList } = ceonvertFactory<Y>(TargetVo)

  const _entity = {
    [name]: class extends ComposeSchema<T, Y> {
      constructor() {
        super(ctx, voCtx, keyList, voKeyList)
      }
    },
  }

  return new _entity[name]()
}