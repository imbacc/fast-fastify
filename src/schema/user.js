const schema = require('fluent-schema')
const { reduce_prop, arr_repeta } = require('@/common/schema_reduce.js')

// enum
const ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER'
}

// type
const string_1_20 = ['string', 1, 20, true]

// prop
const foo_prop = ['name', '名字描述啦', string_1_20]
const username_prop = ['username', '用户名', arr_repeta(string_1_20, 6, 18)]
const user_prop = [
  username_prop,
  ['password', '密码', arr_repeta(string_1_20, 32, 32)],
  ['email', '邮箱', [...arr_repeta(string_1_20, 6, 50), { format: schema.FORMATS.EMAIL }]],
  ['role', '权限', ['enum', Object.values(ROLES), ROLES.USER, true]]
]

// create
const foo = reduce_prop(foo_prop, username_prop)
const user = reduce_prop(...user_prop)

module.exports = {
  foo,
  user
}
