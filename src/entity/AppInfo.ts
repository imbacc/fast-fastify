import type { integer_DTYPE, object_DTYPE, string_DTYPE } from '#/compose/entity'
import type { AppInfo_DTYPE } from '#/entity/appInfo'

import { schemaFactory } from '@/compose/composeFactory'

export class AppInfo implements AppInfo_DTYPE {
  id: integer_DTYPE = {
    description: '',
    type: 'integer',
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

export class AppInfoVo implements Partial<AppInfo_DTYPE> {
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