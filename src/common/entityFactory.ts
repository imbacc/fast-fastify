import { entity_DTYPE } from '#/entity'

import composeTable from '@/common/composeTable'
type entity<T> = { new (): T }
function factory<T extends entity_DTYPE, Y extends entity_DTYPE>(target: entity<T>, targetVo?: entity<Y>): composeTable<T> {
  const ctx: any = new target()
  const name = target.name
  const keys = Object.keys(ctx)
  if (targetVo) ctx.vo = new targetVo()

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
