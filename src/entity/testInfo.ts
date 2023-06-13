import type { integer_DTYPE, string_DTYPE } from '#/compose/entity'
import type { TestInfo_DTYPE } from '#/entity/TestInfo'

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
    maxLength: 30,
  }

  text: string_DTYPE = {
    desc: '',
    type: 'string',
    required: true,
    minLength: 1,
    maxLength: 50,
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
    maxLength: 30,
  }

  text: string_DTYPE = {
    desc: '',
    type: 'string',
    required: true,
    minLength: 1,
    maxLength: 50,
  }
}
export const TestInfoTable = tableFactory<TestInfo>(TestInfo)
export const TestInfoSchema = schemaFactory<TestInfo, TestInfoVo>(TestInfo, TestInfoVo)