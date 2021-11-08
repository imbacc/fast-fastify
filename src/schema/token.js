const { reduce_prop, arr_repeta } = require('@/common/schema_reduce.js')
const { number_0_1, string_1_10, array_20_number, page_prop, size_prop } = require('./global.js')

// prop
const id_prop = ['id', '授权ID', arr_repeta(number_0_1, 1, 10)]
const uuid_prop = ['uuid', '授权用户ID', arr_repeta(string_1_10, 1, 10)]

// create
const id_schema = reduce_prop(id_prop)
const id_uid_schema = reduce_prop(id_prop, uuid_prop)

module.exports = {
  id_schema,
  id_uid_schema
}
