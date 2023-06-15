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

    const entity6 = Object.assign(testDtypeSchema.entity, { qqq: 'qqq' }) as any
    const keys6 = Object.keys(entity6) as any[]
    const convert6 = testDtypeSchema.conVertSchema(entity6, keys6)
    const schema6 = testDtypeSchema.getSchema(convert6)

    // const schema3 = testDtypeSchema.getSchema()
  }
}