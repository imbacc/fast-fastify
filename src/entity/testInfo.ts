// CREATE TABLE `test_info` (
//   `id` int(11) NOT NULL AUTO_INCREMENT,
//   `name` varchar(30) DEFAULT NULL,
//   `text` varchar(30) DEFAULT NULL,
//   PRIMARY KEY (`id`)
// ) ENGINE=MyISAM DEFAULT CHARSET=utf8;
import { attr_DTYPE } from '@/types/db/entity'
import type { entity_DTYPE, testInfo_DTYPE } from '@/types/db/entity'

import entityFactory from '@/db/entityFactory'

class test_info implements testInfo_DTYPE {
  [key: string]: attr_DTYPE
  id: attr_DTYPE = {
    desc: '唯一ID',
    type: 'number', // number 为数字最小数和最大数
    n1: 1,
    n2: 'max',
    len: 11,
  }

  name: attr_DTYPE = {
    desc: '名称啊',
    type: 'string', // string 为字符串最少长度和最大长度
    n1: 1,
    n2: 'max',
    len: 30,
  }

  text: attr_DTYPE = {
    desc: '文本啊',
    type: 'string',
    n1: 1,
    n2: 'max',
    len: 30,
  }

  vo: vo | any
}

class vo implements entity_DTYPE {
  [key: string]: attr_DTYPE
  qqq: attr_DTYPE = {
    desc: '搜索用的关键字',
    type: 'string',
    n1: 1,
    n2: 'max',
    len: 20,
  }

  qwe: attr_DTYPE = {
    desc: 'qwe',
    type: 'string',
    n1: 1,
    n2: 'max',
    len: 3,
  }

  www: attr_DTYPE = {
    desc: 'www',
    type: 'string',
    n1: 3,
    n2: 'max',
    len: 3,
  }
}

export default entityFactory(test_info, vo)
