import type { integer_DTYPE, number_DTYPE, string_DTYPE, object_DTYPE, array_DTYPE } from '#/compose/entity'
import type { TestDtype_DTYPE } from '#/entity/testDtype'

import { schemaFactory } from '@/compose/composeFactory'

export class TestDtype implements TestDtype_DTYPE {
  id: integer_DTYPE = {
    description: '主键ID',
    type: 'integer',
    primaryKey: true,
    maximum: 9999999999,
  }

  date: string_DTYPE = {
    description: '格式化的时间',
    type: 'string',

  }

  json: string_DTYPE = {
    description: 'json格式',
    type: 'string',

  }

  money: number_DTYPE = {
    description: 'money',
    type: 'number',
    required: true,
    minimum: 1,
    maximum: 99999999,
  }

  name: string_DTYPE = {
    description: 'name',
    type: 'string',
    required: true,
    minLength: 1,
  }
}

class Obj {
  aa11: integer_DTYPE = {
    description: '',
    type: 'integer',
    primaryKey: true,
    maximum: 1,
    required: true,
  }

  bb22: string_DTYPE = {
    description: '',
    type: 'string',
    minLength: 1,
    required: true,
  }

  cc33: string_DTYPE = {
    description: '',
    type: 'string',
    minLength: 1,
  }
}

const arrObj: { arrObj1: integer_DTYPE, arrObj2: string_DTYPE } = {
  arrObj1: {
    description: '',
    type: 'integer',
    primaryKey: true,
    maximum: 1,
    required: true,
  },
  arrObj2: {
    description: '',
    type: 'string',
    minLength: 1,
    required: true,
  },
}

class Arr1 {
  jj11: integer_DTYPE = {
    description: 'jj11jj11',
    type: 'integer',
    primaryKey: true,
    maximum: 1,
    required: true,
  }

  kk22: object_DTYPE = {
    description: 'kk22kk22',
    type: 'object',
    required: true,
    target: arrObj,
  }

  ll33: number_DTYPE = {
    description: 'll33ll33',
    type: 'number',
    maximum: 1,
  }
}

class Arr2 {
  qq22: integer_DTYPE = {
    description: 'qq22qq22',
    type: 'integer',
    primaryKey: true,
    maximum: 1,
    required: true,
  }

  ww22: object_DTYPE = {
    description: 'ww22ww22',
    type: 'object',
    required: true,
    target: arrObj,
  }
}

class Arr3 {
  tt33: integer_DTYPE = {
    description: 'tt33tt33',
    type: 'integer',
    primaryKey: true,
    maximum: 1,
    required: true,
  }

  yy33: string_DTYPE = {
    description: 'yy33yy33',
    type: 'string',
    required: true,
  }
}

class Arr4 {
  hh44: integer_DTYPE = {
    description: 'hh44hh44',
    type: 'integer',
    primaryKey: true,
    maximum: 1,
    required: true,
  }

  gg44: array_DTYPE = {
    description: 'gg44gg44',
    type: 'array',
    required: true,
    items: [arrObj],
  }
}

export class TestDtypeVo implements Partial<TestDtype_DTYPE> {
  id: integer_DTYPE = {
    description: '主键ID',
    type: 'integer',
    primaryKey: true,
    maximum: 9999999999,
  }

  date: string_DTYPE = {
    description: '格式化的时间',
    type: 'string',

  }

  json: string_DTYPE = {
    description: 'json格式',
    type: 'string',

  }

  vottt: number_DTYPE = {
    description: 'vottt',
    type: 'number',
    required: true,
    minimum: 1,
    maximum: 99999999,
  }

  jsona: string_DTYPE = {
    description: 'aaa',
    type: 'string',
    required: true,
    minLength: 1,
  }

  objTest: object_DTYPE = {
    description: '测试object对象类型',
    type: 'object',
    required: true,
    target: { ...new Obj() },
  }

  arr1Test: array_DTYPE = {
    description: '测试array对象类型',
    type: 'array',
    minItems: 1,
    maxItems: 2,
    items: [{ ...new Arr1() }, { ...new Arr2() }],
  }

  arr2Test: array_DTYPE = {
    description: '测试array对象类型',
    type: 'array',
    required: true,
    items: [{ ...new Arr3() }, { ...new Arr4() }],
  }
}
export const testDtypeSchema = schemaFactory<TestDtype>(TestDtype)
export const testDtypeSchemaVo = schemaFactory<TestDtypeVo>(TestDtypeVo)
