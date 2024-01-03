import { ComposeTable } from './composeTable'
import { ComposeSchema } from './composeSchema'

function convertCamelToSnake(name: string) {
  return name.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`).slice(1)
}

export function convertFactory<T>(Target) {
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
  const { name, keyList, primaryKey } = convertFactory<T>(Target)

  const _entity = {
    [name]: class extends ComposeTable<T> {
      constructor() {
        super(name, keyList, primaryKey)
      }
    },
  }

  return new _entity[name]()
}

export function schemaFactory<T>(Target): ComposeSchema<T> {
  const { ctx, name, keyList } = convertFactory<T>(Target)

  const _entity = {
    [name]: class extends ComposeSchema<T> {
      constructor() {
        super(ctx, keyList)
      }
    },
  }

  return new _entity[name]()
}