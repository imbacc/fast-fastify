// CREATE TABLE `test_info` (
//   `id` int(11) NOT NULL AUTO_INCREMENT,
//   `name` varchar(30) DEFAULT NULL,
//   `text` varchar(30) DEFAULT NULL,
//   PRIMARY KEY (`id`)
// ) ENGINE=MyISAM DEFAULT CHARSET=utf8;
import composeTable from '@/common/composeTable'

class test_info {
  public id: number = 0
  public name: string = ''
  public text: string = ''
}

interface entity<T> extends Function {
  new (...args: any[]): T
}

// function reportableClassDecorator<T extends { new (...args: any[]): {} }>(constructor: T) {
//   return class extends constructor {
//     reportingURL = "http://www...";
//   };
// }
// @reportableClassDecorator
// function toWoman(constructor) {
//   return class extends constructor {
//      gender = 'female'
//    }
//  }
//  @toWoman

function factory<T>(target: entity<T>): any {
  const ctx: any = new target()
  return class factoryImpl extends composeTable {
    constructor() {
      super(target.name, Object.keys(ctx), 'text')
    }
  }
}

export default factory(test_info)
