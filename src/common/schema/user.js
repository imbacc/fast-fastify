const schema = require('fluent-schema') // fluent-schema 来更简单地设置 JSON schema，并且复用常量。
const fileName = __filename.split('\\').pop().replace('.js', '')

// 枚举
const ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER'
}

const swagger = {
  tags: [fileName],
  summary: '我是用户接口',
  description: '用户接口的描述啊啊啊啊!'
}

const foo = schema.object().prop('name', schema.string().required()).description('名字').valueOf()

const user = schema
  .object()
  .prop('username', schema.string().minLength(6).maxLength(18).required())
  .description('用户名')
  .prop('password', schema.string().minLength(32).maxLength(32).required())
  .description('密码')
  .prop('email', schema.string().format(schema.FORMATS.EMAIL).required())
  .description('邮箱')
  .prop('role', schema.string().enum(Object.values(ROLES)).description('权限').default(ROLES.USER))
  .valueOf()

delete foo.$schema
delete user.$schema
module.exports = {
  swagger,
  foo,
  user
}
