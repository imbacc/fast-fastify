import type { integer_DTYPE, string_DTYPE } from '#/compose/entity'
import type { TestInfo_DTYPE } from '#/entity/testInfo'

import { tableFactory, schemaFactory } from '@/compose/composeFactory'

export class TestInfo implements TestInfo_DTYPE {
  id: integer_DTYPE = {
    desc: '',
    type: 'integer',
    primaryKey: true,
    maximum: 9999999999,
  }

  name: string_DTYPE = {
    desc: '',
    type: 'string',
    required: true,
    minLength: 1,
  }

  text: string_DTYPE = {
    desc: '',
    type: 'string',
    required: true,
    minLength: 1,
  }
}
export class TestInfoVo implements Partial<TestInfo_DTYPE> {
  id: integer_DTYPE = {
    desc: '',
    type: 'integer',
    primaryKey: true,
    maximum: 9999999999,
  }

  name: string_DTYPE = {
    desc: '',
    type: 'string',
    required: true,
    minLength: 1,
  }

  text: string_DTYPE = {
    desc: '',
    type: 'string',
    required: true,
    minLength: 1,
  }
}
export const testInfoTable = tableFactory<TestInfo>(TestInfo)
export const testInfoSchema = schemaFactory<TestInfo, TestInfoVo>(TestInfo, TestInfoVo)