import type { attr_DTYPE, entity_DTYPE } from '#/entity'

import entityFactory from '@/common/entityFactory'

class global implements entity_DTYPE {
  [key: string]: attr_DTYPE

  userid: attr_DTYPE = {
    desc: '接口和schema验证和请求用的userid',
    type: 'number',
    n1: 1,
    n2: 'max',
    len: 11
  }

  page: attr_DTYPE = {
    desc: '分页page',
    type: 'number',
    n1: 1,
    n2: 'max',
    len: 6
  }

  size: attr_DTYPE = {
    desc: '分页size',
    type: 'number',
    n1: 1,
    n2: 'max',
    len: 6
  }
}

export default entityFactory(global)
