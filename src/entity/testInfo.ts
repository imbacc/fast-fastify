import type { integer_DTYPE, number_DTYPE, string_DTYPE, object_DTYPE } from '#/compose/entity'
import type { testInfo_DTYPE } from '#/entity/testInfo'

import { schemaFactory } from '@/compose/composeFactory'

export class TestInfo implements testInfo_DTYPE {
  id: integer_DTYPE = {
    description: '',
    type: 'integer',
    required: true,
    primaryKey: true,
    maximum: 9999999999,
  }

  name: string_DTYPE = {
    description: '',
    type: 'string',
    required: true,
    minLength: 1,
  }

  text: string_DTYPE = {
    description: '',
    type: 'string',
    required: true,
    minLength: 1,
  }
}

export class TestInfoVo implements Partial<testInfo_DTYPE> {
  id: integer_DTYPE = {
    description: '',
    type: 'integer',
    primaryKey: true,
    maximum: 9999999999,
  }

  name: string_DTYPE = {
    description: '',
    type: 'string',
    required: true,
    minLength: 1,
  }

  text: string_DTYPE = {
    description: '',
    type: 'string',
    required: true,
    minLength: 1,
  }
}

export const testInfoSchema = schemaFactory<TestInfo>(TestInfo)
export const testInfoSchemaVo = schemaFactory<TestInfoVo>(TestInfoVo)
