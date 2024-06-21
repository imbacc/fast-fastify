import type { integer_DTYPE, object_DTYPE, string_DTYPE } from '#/compose/entity'
import type { appInfo_DTYPE } from '#/entity/appInfo'

import { schemaFactory } from '@/compose/composeFactory'

import schema from 'fluent-json-schema'

class AppInfoSchema2 {
  id = schema.integer().required().maximum(9999999999).description('this is id')
  text = schema.string().minLength(0).maxLength(1).required().description('this is text')
  father = schema.object().prop('aa', schema.integer()).prop('bb', schema.string()).required().description('this is father')
}

export class AppInfo implements appInfo_DTYPE {
  id: integer_DTYPE = {
    description: '',
    type: 'integer',
    required: true,
    primaryKey: true,
    maximum: 9999999999,
  }

  text: string_DTYPE = {
    description: '',
    type: 'string',
    required: true,
    minLength: 1,
  }

  version: integer_DTYPE = {
    description: '',
    type: 'integer',
    required: true,
    minimum: 1,
    maximum: 9999999999,
  }

  os: integer_DTYPE = {
    description: '',
    type: 'integer',
    required: true,
    minimum: 1,
    maximum: 9999999999,
  }

  ostext: string_DTYPE = {
    description: '',
    type: 'string',
    required: true,
    minLength: 1,
  }

  linkurl: string_DTYPE = {
    description: '',
    type: 'string',
    required: true,
    minLength: 1,
  }
}

class Obj {
  aa: integer_DTYPE = {
    description: '',
    type: 'integer',
    primaryKey: true,
    maximum: 1,
  }

  bb: string_DTYPE = {
    description: '',
    type: 'string',
    required: true,
    minLength: 1,
  }
}

export class AppInfoVo implements Partial<appInfo_DTYPE> {
  id: integer_DTYPE = {
    description: '',
    type: 'integer',
    primaryKey: true,
    maximum: 9999999999,
  }

  obj: object_DTYPE = {
    description: '',
    type: 'string',
    required: true,
    target: { ...new Obj() },
  }
}

export const appInfoSchema = schemaFactory<AppInfo>(AppInfo)
export const appInfoSchemaVo = schemaFactory<AppInfoVo>(AppInfoVo)
