// CREATE TABLE `test_info` (
//   `id` int(11) NOT NULL AUTO_INCREMENT,
//   `name` varchar(30) DEFAULT NULL,
//   `text` varchar(30) DEFAULT NULL,
//   PRIMARY KEY (`id`)
// ) ENGINE=MyISAM DEFAULT CHARSET=utf8;
import { test_info } from '#/entity'

import entityFactory from '@/common/entityFactory'

class test_info extends test_info {}

export default entityFactory(test_info)
