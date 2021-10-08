const { METHOD } = require('@/common/config.js')
const { uid } = require('@/schema/version.js')

module.exports = {
  version: {
    url: '/version',
    method: METHOD.GET,
    schema: {
      query: uid
    }
  }
}
