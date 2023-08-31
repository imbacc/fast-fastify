import type { integer_DTYPE, string_DTYPE } from '#/compose/entity'
import type { AppInfo_DTYPE } from '#/entity/appInfo'

import { schemaFactory } from '@/compose/composeFactory'

export class AppInfo implements AppInfo_DTYPE {
  id: integer_DTYPE = {
    desc: '',
    type: 'integer',
    primaryKey: true,
    maximum: 9999999999,
  }

  text: string_DTYPE = {
    desc: '',
    type: 'string',
    required: true,
    minLength: 1,
  }

  version: integer_DTYPE = {
    desc: '',
    type: 'integer',
    required: true,
    minimum: 1,
    maximum: 9999999999,
  }

  os: integer_DTYPE = {
    desc: '',
    type: 'integer',
    required: true,
    minimum: 1,
    maximum: 9999999999,
  }

  ostext: string_DTYPE = {
    desc: '',
    type: 'string',
    required: true,
    minLength: 1,
  }

  linkurl: string_DTYPE = {
    desc: '',
    type: 'string',
    required: true,
    minLength: 1,
  }
}
export class AppInfoVo implements Partial<AppInfo_DTYPE> {
  id: integer_DTYPE = {
    desc: '',
    type: 'integer',
    primaryKey: true,
    maximum: 9999999999,
  }

  text: string_DTYPE = {
    desc: '',
    type: 'string',
    required: true,
    minLength: 1,
  }

  version: integer_DTYPE = {
    desc: '',
    type: 'integer',
    required: true,
    minimum: 1,
    maximum: 9999999999,
  }

  os: integer_DTYPE = {
    desc: '',
    type: 'integer',
    required: true,
    minimum: 1,
    maximum: 9999999999,
  }

  ostext: string_DTYPE = {
    desc: '',
    type: 'string',
    required: true,
    minLength: 1,
  }

  linkurl: string_DTYPE = {
    desc: '',
    type: 'string',
    required: true,
    minLength: 1,
  }
}
export const appInfoSchema = schemaFactory<AppInfo, AppInfoVo>(AppInfo, AppInfoVo)