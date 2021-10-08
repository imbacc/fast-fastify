const { reduce_prop, arr_repeta } = require('@/common/schema_reduce.js')

// type
const number_1_5 = ['number', 1, 5, true]
const string_1_10 = ['string', 1, 10, true]

// prop
const id_prop = ['id', '授权ID', number_1_5]
const uuid_prop = ['uuid', '授权用户ID', string_1_10]

// create
const id = reduce_prop(id_prop)
const uid = reduce_prop(id_prop, uuid_prop)

module.exports = {
  id,
  uid
}
