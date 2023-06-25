import type { integer_DTYPE, number_DTYPE, string_DTYPE } from '#/compose/entity'
import type { TestDtype_DTYPE } from '#/entity/testDtype'

import { tableFactory, schemaFactory } from '@/compose/composeFactory'

export class TestDtype implements TestDtype_DTYPE {
  id: integer_DTYPE = {
    desc: '主键ID',
    type: 'integer',
    primaryKey: true,
    maximum: 9999999999,
  }

  money: number_DTYPE = {
    desc: '钱',
    type: 'number',
    maximum: 999999,
  }

  name: string_DTYPE = {
    desc: '名字',
    type: 'string',

  }

  date: string_DTYPE = {
    desc: '格式化的时间',
    type: 'string',
    required: true,
    minLength: 1,
  }

  json: string_DTYPE = {
    desc: 'json格式',
    type: 'string',
    required: true,
    minLength: 1,
  }
}
export class TestDtypeVo implements Partial<TestDtype_DTYPE> {
  id: integer_DTYPE = {
    desc: '主键ID',
    type: 'integer',
    primaryKey: true,
    maximum: 9999999999,
  }

  money: number_DTYPE = {
    desc: '钱',
    type: 'number',
    maximum: 999999,
  }

  name: string_DTYPE = {
    desc: '名字',
    type: 'string',

  }

  date: string_DTYPE = {
    desc: '格式化的时间',
    type: 'string',
    required: true,
    minLength: 1,
  }

  json: string_DTYPE = {
    desc: 'json格式',
    type: 'string',
    required: true,
    minLength: 1,
  }

  vottt: string_DTYPE = {
    desc: 'vottt',
    type: 'string',
    required: true,
    minLength: 1,
  }
}
export const testDtypeTable = tableFactory<TestDtype>(TestDtype)
export const testDtypeSchema = schemaFactory<TestDtype, TestDtypeVo>(TestDtype, TestDtypeVo)