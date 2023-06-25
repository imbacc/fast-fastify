import type { number_DTYPE, string_DTYPE } from '#/compose/entity'

import { testDtypeSchema, testDtypeTable } from '@/entity/testDtype'

class TestService {
  // 基本curd
  getCurdSql() {
    const add = testDtypeTable.crudInsert().getSql()
    const deleted = testDtypeTable.curdDeleteById().getSql()
    const update = testDtypeTable.curdUpdateById().getSql()
    const select1 = testDtypeTable.curdSelectById().getSql()
    const select2 = testDtypeTable.curdSelectByPage().getSql()
    const select3 = testDtypeTable.crudSelectAll().getSql()
    return { add, deleted, update, select1, select2, select3 }
  }

  // 追加字段
  getAppendKeySql() {
    return testDtypeTable.appendKey('append').select('id = 1').getSql()
  }

  // 根据自定义sql并且串根据id更新的sql
  getSetSql() {
    return testDtypeTable.setSql('SELECT id,name,text FROM test_info').curdUpdateById().getSql()
  }

  // 排除id查询全部
  getOmitKeySql() {
    return testDtypeTable.omitKey('id').crudSelectAll().getSql()
  }

  // 只显示data字段查询全部
  getPickKeySql() {
    return testDtypeTable.pickKey('date').crudSelectAll().getSql()
  }

  // 基本schema
  getSchema() {
    // 实体VO合并生成
    const schema1 = testDtypeSchema.allSchema()
    // 实体生成
    const schema2 = testDtypeSchema.getSchema()
    // VO生成
    const schema3 = testDtypeSchema.getSchemaVo()
    // 选择后的字段生成
    const schema4 = testDtypeSchema.pickSchema('name')
    // 排除后的其他字段生成
    const schema5 = testDtypeSchema.omitSchema('name')
    // VO选取同上
    const schema6 = testDtypeSchema.pickSchemaVo('id')
    // VO排除同上
    const schema7 = testDtypeSchema.omitSchemaVo('id')

    class Append {
      qqq: string_DTYPE = { desc: '测试追加qqq', type: 'string', minLength: 1, maxLength: 20, defaultFormat: 'email' }
      www: number_DTYPE = { desc: '测试追加www', type: 'number', minimum: 1, maximum: 2 }
    }

    const appendJson = Object.assign(new Append())

    // 实体追加 根据类定义追加
    const schema8 = testDtypeSchema.appendSchema(appendJson)
    // 实体追加 object定义追加
    const schema9 = testDtypeSchema.appendSchema({ fff: { desc: '测试追加单个fff', type: 'string' }, over: { desc: '测试格式', type: 'array', item: { desc: 'aa', type: 'number', minimum: 1 } } })
    // VO追加同上
    const schema10 = testDtypeSchema.appendSchemaVo(appendJson)
    // VO追加替换 同上
    const schema11 = testDtypeSchema.appendSchemaVo({ id: { desc: '追加替换id', type: 'string', minLength: 1 }, name: { desc: '追加替换name', type: 'object' } })

    // 只需小改动 原有基础更新某个属性值
    const schema12 = testDtypeSchema.changeSchema({ name: { desc: '更新了desc内容' } })

    // 根据原有基础选择字段 创造新的实体schema - 需要调用getSchema获取原生schema
    const schema13EntitySchema = testDtypeSchema.pickEntitySchema(['json', 'date'])
    const schema13 = testDtypeSchema.getSchema(schema13EntitySchema)
    // vo 同上
    const schema14EntitySchema = testDtypeSchema.pickEntitySchemaVo(['vottt', 'json'])
    const schema14 = testDtypeSchema.getSchema(schema14EntitySchema)

    // 根据原有基础排除字段 创造新的实体schema - 需要调用getSchema获取原生schema
    const schema15EntitySchema = testDtypeSchema.omitEntitySchema(['json', 'date'])
    const schema15 = testDtypeSchema.getSchema(schema15EntitySchema)
    // vo 同上
    const schema16EntitySchema = testDtypeSchema.omitEntitySchemaVo(['vottt', 'json'])
    const schema16 = testDtypeSchema.getSchema(schema16EntitySchema)

    // 全新创造的entity - 需要转换实体schema 然后调用getSchema获取原生schema
    const entitySchema = testDtypeSchema.conVertSchema(appendJson, Object.keys(appendJson))
    const appendPropsSchema = testDtypeSchema.createProps('abcd', { desc: '临时追加', type: 'string' }, entitySchema)
    const schema17 = testDtypeSchema.getSchema(appendPropsSchema)

    return {
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
      schema14: JSON.stringify(schema14),
      schema15: JSON.stringify(schema15),
      schema16: JSON.stringify(schema16),
      schema17: JSON.stringify(schema17),
    }
  }
}

const testService = new TestService()

console.log('%c [ testService.getCurdSql() ]-8', 'font-size:14px; background:#41b883; color:#ffffff;', testService.getCurdSql())
console.log('%c [ testService.getAppendKeySql() ]-9', 'font-size:14px; background:#41b883; color:#ffffff;', testService.getAppendKeySql())
console.log('%c [ testService.getSetSql() ]-10', 'font-size:14px; background:#41b883; color:#ffffff;', testService.getSetSql())
console.log('%c [ testService.getOmitKeySql() ]-11', 'font-size:14px; background:#41b883; color:#ffffff;', testService.getOmitKeySql())
console.log('%c [ testService.getPickKeySql() ]-12', 'font-size:14px; background:#41b883; color:#ffffff;', testService.getPickKeySql())
console.log('%c [ testService.getSchema() ]-13', 'font-size:14px; background:#41b883; color:#ffffff;', testService.getSchema())