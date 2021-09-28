const schema = require('fluent-schema') // fluent-schema 来更简单地设置 JSON schema，并且复用常量。

const uid = schema
  .object()
  .prop('id', schema.integer().minimum(1).maximum(5).required())
  .description('授权ID')
  .prop('uuid', schema.string().maxLength(10).required())
  .description('授权用户ID')
  .valueOf()

delete uid.$schema
module.exports = {
  uid
}
