import { entity_DTYPE } from '#/entity'

import composeTable from '@/common/composeTable'
type entity<T> = { new (): T }
function factory<T extends entity_DTYPE>(target: entity<T>, targetVo?: entity<T>): composeTable<T> {
  const ctx: any = new target()
  const name = target.name
  const keys = Object.keys(ctx)
  if (targetVo) ctx.vo = targetVo
  keys.forEach((key: string) => {
    const { desc, type, n1, n2, len } = ctx[key]
    let n2Val = n2
    if (len > 0 && n2 === 'max') {
      if (type === 'number') n2Val = parseInt(`${Array(len).fill(9).join('')}`)
      if (type === 'string') n2Val = len
    }
    ctx[key].schema = [key, desc, [type, n1, n2Val, true, false]]
  })

  const _entity = {
    [`${name}`]: class extends composeTable<T> {
      constructor() {
        super(name, keys as Array<keyof T>, ctx)
      }
    }
  }

  return new _entity[name]()
}

export default factory
