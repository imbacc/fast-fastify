import type { integer_DTYPE, string_DTYPE } from '#/compose/entity'
import type { AppInfo_DTYPE } from '#/entity/appInfo'

import { tableFactory, schemaFactory } from '@/compose/composeFactory'

export class AppInfo implements AppInfo_DTYPE {
  id: integer_DTYPE = {
    desc: '',
    type: 'integer',
    primaryKey: true,
    maximum: 9999999999,
  }

  linkurl: string_DTYPE = {
    desc: '',
    type: 'string',
    required: true,
    minLength: 1,
    maxLength: 300,
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
    maxLength: 6,
  }

  text: string_DTYPE = {
    desc: '',
    type: 'string',
    required: true,
    minLength: 1,
    maxLength: 200,
  }

  version: integer_DTYPE = {
    desc: '',
    type: 'integer',
    required: true,
    minimum: 1,
    maximum: 9999999999,
  }
}
export class AppInfoVo implements Partial<AppInfo_DTYPE> {
  id: integer_DTYPE = {
    desc: '',
    type: 'integer',
    primaryKey: true,
    maximum: 9999999999,
  }

  linkurl: string_DTYPE = {
    desc: '',
    type: 'string',
    required: true,
    minLength: 1,
    maxLength: 300,
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
    maxLength: 6,
  }

  text: string_DTYPE = {
    desc: '',
    type: 'string',
    required: true,
    minLength: 1,
    maxLength: 200,
  }

  version: integer_DTYPE = {
    desc: '',
    type: 'integer',
    required: true,
    minimum: 1,
    maximum: 9999999999,
  }
}
export const appInfoTable = tableFactory<AppInfo>(AppInfo)
export const appInfoSchema = schemaFactory<AppInfo, AppInfoVo>(AppInfo, AppInfoVo)