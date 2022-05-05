import { METHOD } from '@/common/config'

import global from '@/entity/global'

export default {
  api_token: {
    url: '/token',
    method: METHOD.GET,
    schema: {
      querystring: global.schema.pickSchema('userid')
    }
  }
}
