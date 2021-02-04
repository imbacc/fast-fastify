const schema = require('fluent-schema') // fluent-schema 来更简单地设置 JSON schema，并且复用常量。

const MY_KEY = {
  KEY1: 'ONE',
  KEY2: 'TWO'
}

const ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER'
}

const foo = schema.object().prop('name', schema.string().required()).valueOf()
delete foo.$schema

const user = schema
  .object()
  .prop('username', schema.string().minLength(6).maxLength(18).required())
  .prop('password', schema.string().minLength(32).maxLength(32).required())
  .prop('email', schema.string().format(schema.FORMATS.EMAIL).required())
  .prop('role', schema.string().enum(Object.values(ROLES)).default(ROLES.USER))

module.exports = {
  foo,
  user
}
