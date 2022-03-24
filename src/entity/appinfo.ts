// `id` int(11) NOT NULL AUTO_INCREMENT,
// `text` varchar(200) DEFAULT NULL,
// `version` int(11) DEFAULT NULL,
// `os` int(1) DEFAULT NULL,
// `ostext` varchar(5) DEFAULT NULL,
// `linkurl` varchar(300) DEFAULT NULL,

export interface appInfo_DTYPE {
  id: number
  text: string
  version: number
  os: number
  ostext: string
  linkurl: string
}

// const limitLength = (value: string | number, num: number) => {
//   if (value as string) {
//     if (value.toString().length > num) return new Error(`${}长度不能大于`)
//   }
// }

// const test = (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
//   console.log('target', target)
//   let originalMethod = descriptor.value
//   descriptor.value = function (...args: any[]) {
//     console.log('wrapped function: before invoking ' + propertyKey)
//     let result = originalMethod.apply(this, args)
//     console.log('wrapped function: after invoking ' + propertyKey)
//     return result
//   }
// }

// function Log(target: Function, key: string, parameterIndex: number) {
//   let functionLogged = key || target.prototype.constructor.name
//   console.log(`The parameter in position ${parameterIndex} at ${functionLogged} has been decorated`)
// }

function logProperty(target: any, key: string) {
  delete target[key]

  const backingField = '_' + key

  Object.defineProperty(target, backingField, {
    writable: true,
    enumerable: true,
    configurable: true
  })

  // property getter
  const getter = function (this: any) {
    const currVal = this[backingField]
    console.log(`Get: ${key} => ${currVal}`)
    return currVal
  }

  // property setter
  const setter = function (this: any, newVal: any) {
    console.log(`Set: ${key} => ${newVal}`)
    this[backingField] = newVal
  }

  // Create new property with getter and setter
  Object.defineProperty(target, key, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true
  })
}

export class appInfo implements appInfo_DTYPE {
  text: string = ''
  version: number = 0
  os: number = 0
  ostext: string = ''
  linkurl: string = ''

  @logProperty
  id: number = 0

  // @test
  // ddd(@Log arg: any): any {
  //   console.log('runTask invoked, args: ' + arg)
  //   return 'finished'
  // }

  // @logProperty
  // set id(id: number) {
  //   if (this.id) this.id = id
  // }

  // get id() {
  //   return this.id
  // }
}
