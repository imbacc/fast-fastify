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

export class appInfo implements appInfo_DTYPE {
  text: string = ''
  version: number = 0
  os: number = 0
  ostext: string = ''
  linkurl: string = ''

  set id(value: number) {
    if (this.id) this.id = value
  }

  get id() {
    return this.id
  }
}
