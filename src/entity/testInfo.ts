// CREATE TABLE `test_info` (
//   `id` int(11) NOT NULL AUTO_INCREMENT,
//   `name` varchar(30) DEFAULT NULL,
//   `text` varchar(30) DEFAULT NULL,
//   PRIMARY KEY (`id`)
// ) ENGINE=MyISAM DEFAULT CHARSET=utf8;
import entityFactory from '@/common/entityFactory'

class test_info {
  public id: number = 0
  public name: string = ''
  public text: string = ''

  constructor() {
    this.id.constructor.prototype.dd = 'ddd'
    console.log('this.id', this.id.constructor.prototype)
    console.log('this.id', this.id)
    console.log('this.id', this.id.constructor === Number)
    console.log('this.id', this.id.constructor.toString())
  }
}

export default entityFactory(test_info)
