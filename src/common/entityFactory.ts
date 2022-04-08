import composeTable from '@/common/composeTable'

interface entity<T> extends Function {
  new (...args: any[]): T
}

// function factory<T>(target: entity<T>): any {
//   console.log('%c [ target ]-25', 'font-size:13px; background:#41b883; color:#ffffff;', target)
//   const ctx: any = new target()
//   return class factoryImpl extends composeTable {
//     constructor() {
//       super(target.name, Object.keys(ctx))
//     }
//   }
// }

function factory<T>(target: entity<T>): composeTable {
  const ctx: any = new target()
  return class factoryImpl extends composeTable {
    constructor() {
      super(target.name, Object.keys(ctx))
    }
  }
}

export default factory
