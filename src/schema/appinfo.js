const { reduce_prop, arr_repeta } = require('@/common/schema_reduce.js')
const { number_0_1, string_1_10, array_20_number, page_prop, size_prop } = require('./global.js')

// prop
const id_prop = ['id', 'appinfo id', arr_repeta(number_0_1, 1, 999999)]
const appinfo_prop = [
  ['text', '文本', arr_repeta(string_1_10, 1, 200)],
  ['version', '版本那', arr_repeta(number_0_1, 0, 999999)],
  ['os', '机型', number_0_1],
  ['ostext', '机型描述', arr_repeta(string_1_10, 1, 6)],
  ['linkurl', '地址描述', arr_repeta(string_1_10, 1, 300)]
]

// create
const id_schema = reduce_prop(id_prop)
const add_schema = reduce_prop(...appinfo_prop)
const update_schema = reduce_prop(id_prop, ...appinfo_prop)

module.exports = {
  id_schema,
  add_schema,
  update_schema
}
