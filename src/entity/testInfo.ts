// CREATE TABLE `test_info` (
//   `id` int(11) NOT NULL AUTO_INCREMENT,
//   `name` varchar(30) DEFAULT NULL,
//   `text` varchar(30) DEFAULT NULL,
//   PRIMARY KEY (`id`)
// ) ENGINE=MyISAM DEFAULT CHARSET=utf8;
import type { attr_DTYPE, test_info_DTYPE } from '#/entity'

import entityFactory from '@/common/entityFactory'

class test_info implements test_info_DTYPE {
  [key: string]: attr_DTYPE
  id: attr_DTYPE = {
    desc: '唯一ID',
    type: 'number',
    n1: 1,
    n2: 'max',
    len: 11
  }

  name: attr_DTYPE = {
    desc: '名称啊',
    type: 'string',
    n1: 1,
    n2: 'max',
    len: 30
  }

  text: attr_DTYPE = {
    desc: '文本啊',
    type: 'string',
    n1: 1,
    n2: 'max',
    len: 30
  }
}

export default entityFactory(test_info)
