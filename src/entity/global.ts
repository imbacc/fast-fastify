// const { arr_repeta } = require('@/common/schemaReduce')

export interface pages_DTYPE {
  page: number
  size: number
}

export class pages implements pages_DTYPE {
  page: number = 0
  size: number = 0
}

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