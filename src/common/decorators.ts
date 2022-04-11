// import composeTable from '@/common/composeTable'

// class entityDrive {
//   name: string = ''
//   desc: string = ''
//   length: number = 1
//   min: number = 1
//   max: number = 1
//   type: unknown
// }

interface entity {
  new (...args: any[]): any
}

/**
 * 类名装饰器 - class
 * @param newName 修改实体类名称
 */
export function entityName(newName: string) {
  return function (target: entity) {
    target.constructor.prototype.entityName = newName
  }
}

/**
 * 属性装饰器 - attr
 * @param target
 * @param key
 */
export function entityAttr(...args: any[]) {
  console.log('%c [ args ]-22', 'font-size:13px; background:#41b883; color:#ffffff;', args)
  return function (target: any, key: string) {
    console.log('%c [ key ]-24', 'font-size:13px; background:#41b883; color:#ffffff;', key)
    console.log('%c [ target ]-24', 'font-size:13px; background:#41b883; color:#ffffff;', target)
    console.log('target.prototype', target[key])
  }
}
