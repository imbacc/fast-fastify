import composeTable from '@/common/composeTable'
import schemaReduce from '@/common/schemaReduce'

interface entity<T> {
  new (...args: any[]): T
}

const schema = new schemaReduce()
function factory<T>(target: entity<T>): composeTable {
  const ctx: any = new target()
  return new (class extends composeTable {
    private schema: schemaReduce = schema

    constructor() {
      super(target.name, Object.keys(ctx))
    }
  })()
}

export default factory
