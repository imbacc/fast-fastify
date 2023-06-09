import type { entity_DTYPE } from '@/types/db/entity'

import composeTable from '@/db/composeTable'

function factory<T extends entity_DTYPE, Y extends entity_DTYPE>(Target: { new(): T }, TargetVo?: { new(): Y }): composeTable<T> {
  const ctx = new Target()
  const name = Target.name
  const keys = Object.keys(ctx)
  if (TargetVo) ctx.vo = new TargetVo()

  const _entity = {
    [name]: class extends composeTable<T> {
      constructor() {
        super(name, keys, ctx)
      }
    },
  }

  return new _entity[name]()
}

export default factory
