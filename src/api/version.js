const { METHOD } = require('@/common/config.js')
const schema = require('@/schema/version.js')

module.exports = {
  api_version: {
    url: '/version',
    method: METHOD.GET,
    schema: {
      query: schema.uid_schema
    }
  }
}
