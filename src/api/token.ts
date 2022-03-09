import { METHOD } from '@/common/config'

import schema from '@/schema/token'

export default {
  api_token: {
    url: '/token',
    method: METHOD.GET,
    schema: {
      query: schema.id_uid_schema
    }
  }
}
