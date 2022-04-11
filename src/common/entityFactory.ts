import composeTable from '@/common/composeTable'
// import schemaReduce from '@/common/schemaReduce'

// interface entity {
//   new (...args: any[]): any
// }
// const schema = new schemaReduce()
function factory(target: InstanceType<any>): composeTable {
  let ctx: any = new target()
  const name = target.name
  const keys = Object.keys(ctx)
  ctx = null
  return new (class extends composeTable {
    // private schema: schemaReduce = schema

    constructor() {
      super(name, keys)
      // console.log('%c [ schema ]-13', 'font-size:13px; background:#41b883; color:#ffffff;', this.schema)
    }
  })()
}

export default factory
