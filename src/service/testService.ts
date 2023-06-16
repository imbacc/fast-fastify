import type { number_DTYPE, string_DTYPE } from '#/compose/entity'
import { testDtypeSchema } from '@/entity/TestDtype'
import { testInfoTable } from '@/entity/testInfo'

export class TestService {
  // 实体
  getEntity() {
    return testDtypeSchema.entity
  }

  // 实体vo
  getEntityVo() {
    return testDtypeSchema.entityVo
  }

  // 基本curd
  getCurdSql() {
    const add = testInfoTable.crudInsert().getSql()
    const deleted = testInfoTable.curdDeleteById().getSql()
    const update = testInfoTable.curdUpdateById().getSql()
    const select1 = testInfoTable.curdSelectById('10086').getSql()
    const select2 = testInfoTable.curdSelectByPage().getSql()
    const select3 = testInfoTable.crudSelectAll().getSql()
    return { add, deleted, update, select1, select2, select3 }
  }

  // 追加字段
  getAppendKeySql() {
    return testInfoTable.appendKey('append').select('id = 1').getSql()
  }

  // 根据自定义sql并且串根据id更新的sql
  getSetSql() {
    return testInfoTable.setSql('SELECT id,name,text FROM test_info').curdUpdateById('10086').getSql()
  }

  // 排除id查询全部
  getOmitKeySql() {
    return testInfoTable.omitKey('id').crudSelectAll().getSql()
  }

  // 只显示text字段查询全部
  getPickKeySql() {
    return testInfoTable.pickKey('text').crudSelectAll().getSql()
  }

  // 基本schema
  getSchema() {
    const schema0 = testDtypeSchema.allSchema()
    const schema1 = testDtypeSchema.getSchema()
    const schema2 = testDtypeSchema.pickSchema('name')
    const schema3 = testDtypeSchema.omitSchema('name')
    const schema4 = testDtypeSchema.pickSchemaVo('id')
    const schema5 = testDtypeSchema.omitSchemaVo('id')

    class AppendVo {
      qqq: string_DTYPE = { desc: '测试追加qqq', type: 'string', minLength: 1, maxLength: 20, defaultFormat: 'email' }
      www: number_DTYPE = { desc: '测试追加www', type: 'number', minimum: 1, maximum: 2 }
    }

    const schema6 = testDtypeSchema.appendSchema(Object.assign(new AppendVo()))
    const schema7 = testDtypeSchema.appendSchema({ fff: { desc: '测试追加单个fff', type: 'string' } })
    const schema8 = testDtypeSchema.appendSchema({ over: { desc: '测试格式', type: 'array', item: { desc: 'aa', type: 'number', minimum: 1 } } })

    return {
      schema0,
      schema1,
      schema2,
      schema3,
      schema4,
      schema5,
      schema6,
      schema7,
      schema8,
    }
  }
}