// CREATE TABLE `test_info` (
//   `id` int(11) NOT NULL AUTO_INCREMENT,
//   `name` varchar(30) DEFAULT NULL,
//   PRIMARY KEY (`id`)
// ) ENGINE=MyISAM DEFAULT CHARSET=utf8;

export interface appInfo_DTYPE {
  id: number
  name: string
}

export class appInfo implements appInfo_DTYPE {
  id: number = 0
  name: string = ''
}
