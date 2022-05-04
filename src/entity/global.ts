import type { attr_DTYPE, entity_DTYPE, testInfo_DTYPE } from '#/entity'

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

// const number_0_1 = ['number', 0, 1, true]
// const string_1_10 = ['string', 1, 10, true]
// const array_20_number = ['array', 20, 'number', true]

// const userid_prop = ['userid', '用户ID', arr_repeta(number_0_1, 1, 999999)]
// const page_prop = ['page', '当前分页', arr_repeta(number_0_1, 1, 999999)]
// const size_prop = ['size', '分页数量', arr_repeta(number_0_1, 1, 999999)]

// module.exports = {
//   number_0_1,
//   string_1_10,
//   array_20_number,
//   //
//   page_prop,
//   size_prop,
//   userid_prop
// }
