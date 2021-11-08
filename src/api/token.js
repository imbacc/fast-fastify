const { METHOD } = require('@/common/config.js')
const schema = require('@/schema/token.js')

module.exports = {
  api_token: {
    url: '/token',
    method: METHOD.GET,
    schema: {
      query: schema.id_uid_schema
    }
  }
}
