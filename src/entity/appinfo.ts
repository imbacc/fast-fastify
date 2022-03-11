// `id` int(11) NOT NULL AUTO_INCREMENT,
// `text` varchar(200) DEFAULT NULL,
// `version` int(11) DEFAULT NULL,
// `os` int(1) DEFAULT NULL,
// `ostext` varchar(5) DEFAULT NULL,
// `linkurl` varchar(300) DEFAULT NULL,

import { throws } from 'assert'

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

function setLimitLength(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log('target', target)
  let originalMethod = descriptor.value
  descriptor.value = function (value: any) {
    console.log('wrapped function: before invoking ' + propertyKey)
    let result = originalMethod.apply(this, value)
    console.log('wrapped function: after invoking ' + propertyKey)
    return result
  }
}

export class appInfo implements appInfo_DTYPE {
  text: string = ''
  version: number = 0
  os: number = 0
  ostext: string = ''
  linkurl: string = ''

  @setLimitLength
  set id(value: number) {
    if (this.id) this.id = value
  }

  get id() {
    return this.id
  }
}
