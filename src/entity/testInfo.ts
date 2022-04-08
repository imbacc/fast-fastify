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
}

export default entityFactory<test_info>(test_info)
