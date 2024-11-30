import type { number_DTYPE, integer_DTYPE, string_DTYPE } from '#/compose/entity'

import { schemaFactory } from '@/compose/composeFactory'
import { testDtypeSchema, testDtypeSchemaVo } from '@/entity/testDtype'
import { prisma } from '@/effect/index'

class TestService {
  // 基本curd
  async getCurdSql() {
    // prisma执行
    const res1 = await prisma.app_info.findMany()
    const res2 = await prisma.test_dtype.findMany()
    const res3 = await prisma.test_info.findMany()
    console.log('%c [ testService.getCurdSql() ]-13', 'font-size:14px; background:#41b883; color:#ffffff;', { res1: JSON.stringify(res1), res2: JSON.stringify(res2), res3: JSON.stringify(res3) })
  }

  // 基本schema
  getSchema() {
    // 实体生成
    const schema1 = testDtypeSchema.getSchema()
    // 选择后的字段生成
    const schema2 = testDtypeSchema.pickSchema('name')
    // 排除后的其他字段生成
    const schema3 = testDtypeSchema.omitSchema('name')

    // VO选取同上
    const schema4 = testDtypeSchemaVo.pickSchema('id')
    // VO排除同上
    const schema5 = testDtypeSchemaVo.omitSchema('id')

    class Append {
      qqq: string_DTYPE = { description: '测试追加qqq', type: 'string', minLength: 1, maxLength: 20, format: 'email' }
      www: number_DTYPE = { description: '测试追加www', type: 'number', minimum: 1, maximum: 2 }
    }

    const appendJson = Object.assign(new Append())

    class TestAppend {
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

    const schema6 = testDtypeSchema.appendSchema({
      obj: { description: '测试追加object对象类型', type: 'object', target: { ...new TestAppend() } },
    })

    // 实体追加 根据类定义追加
    const schema7 = testDtypeSchema.appendSchema(appendJson)
    // 实体追加 object定义追加
    const schema8 = testDtypeSchema.appendSchema({ fff: { description: '测试追加单个fff', type: 'string' }, over: { description: '测试格式', type: 'array', items: [{ ...new TestAppend() }] } })
    // VO追加替换 同上
    const schema9 = testDtypeSchemaVo.appendSchema({ id: { description: '追加替换id', type: 'string', minLength: 1 }, name: { description: '追加替换name', type: 'string' } })

    // 只需小改动 原有基础更新某个属性值
    const schema10 = testDtypeSchema.changeSchema({ name: { description: '更新了desc内容' } })

    // 根据原有基础选择字段 创造新的实体schema - 需要调用getSchema获取原生schema
    const schema11EntitySchema = testDtypeSchema.pickEntitySchema(['json', 'date'])
    const schema11 = testDtypeSchema.getSchema(schema11EntitySchema)
    // vo 同上
    const schema12EntitySchema = testDtypeSchemaVo.pickEntitySchema(['vottt', 'jsona'])
    const schema12 = testDtypeSchemaVo.getSchema(schema12EntitySchema)

    // 根据原有基础排除字段 创造新的实体schema - 需要调用getSchema获取原生schema
    const schema13EntitySchema = testDtypeSchema.omitEntitySchema(['json', 'date'])
    const schema13 = testDtypeSchema.getSchema(schema13EntitySchema)

    const result = {
      schema1: JSON.stringify(schema1),
      schema2: JSON.stringify(schema2),
      schema3: JSON.stringify(schema3),
      schema4: JSON.stringify(schema4),
      schema5: JSON.stringify(schema5),
      schema6: JSON.stringify(schema6),
      schema7: JSON.stringify(schema7),
      schema8: JSON.stringify(schema8),
      schema9: JSON.stringify(schema9),
      schema10: JSON.stringify(schema10),
      schema11: JSON.stringify(schema11),
      schema12: JSON.stringify(schema12),
      schema13: JSON.stringify(schema13),
    }

    console.log('%c [ testService.getSchema() ]-13', 'font-size:14px; background:#41b883; color:#ffffff;', result)
  }
}

const testService = new TestService()
testService.getCurdSql()
testService.getSchema()
