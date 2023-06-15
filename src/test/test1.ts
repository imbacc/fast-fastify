// import schema from 'fluent-json-schema'
// import { TestInfoService } from '@/service/TestDtypeService'

// const testInfoService = new TestInfoService()

// console.log('index.ts testInfo=', test)
// console.log('test.schema.entity.vo', test.schema.entity.vo)
// console.log('sql1=', test.crudSelectAll().getSql())
// console.log('sql2=', test.crudInsert().getSql())
// console.log('sql3=', test.curdSelectById().getSql())
// console.log('sql4=', test.curdSelectByPage().getSql())
// console.log('sql5=', test.curdDeleteById().getSql())
// console.log('sql6=', test.curdUpdateById().getSql())
// console.log('sql7=', test.clearKey().appendKey('text').select().getSql())
// console.log('sql8=', test.setSql('SELECT id,name,text FROM test_info').getSql())
// console.log('sql9=', test.omitKey('id').crudSelectAll().getSql())
// console.log('sql10=', test.pickKey('id').crudSelectAll().getSql())
// console.log('test.schema.allSchema=======', test.schema.allSchema())
// console.log('test.schema.pickSchema=======', test.schema.pickSchema('id'))
// console.log('test.schema.omitSchema=======', test.schema.omitSchema('id'))
// console.log('test.schema.appendSchemaVo', test.schema.appendSchemaVo(test.schema.entity.vo).allSchema())
// console.log('test.schema.appendSchemaVo2', test.schema.appendSchemaVo(test.schema.entity.vo.qqq).allSchema())
// console.log('test.schema.appendSchemaVo3', test.schema.appendSchemaVo([test.schema.entity.vo.qqq, test.schema.entity.vo.www]).allSchema())
// console.log(
//   'test.schema.appendSchemaVo4',
//   test.schema.appendSchemaVo({ search: Object.assign(test.schema.entity.name, { desc: '搜索名称', n2: 10 }) }).allSchema(),
// )
// console.log(
//   'test.schema.appendSchemaVo5',
//   test.schema
//     .appendSchemaVo([
//       { search: Object.assign(test.schema.entity.name, { desc: '搜索名称', n2: 10 }) },
//       { bingo: Object.assign(test.schema.entity.name, { desc: '3倍暴击', n1: 3, n2: 3, type: 'number', len: 3 }) },
//     ])
//     .allSchema(),
// )
// console.log(
//   'test.schema.updateSchema1=======',
//   test.schema.updateSchema({ name: { format: schema.FORMATS.EMAIL, maxLength: 1 } }).allSchema(),
// )

// const ROLES = {
//   ADMIN: 'ADMIN',
//   USER: 'USER',
// }
// console.log(
//   'test.schema.updateSchema2=======',
//   test.schema
//     .appendSchemaVo({
//       role: Object.assign(test.schema.entity.name, {
//         desc: '测试updateSchema',
//         type: 'enum',
//         n1: Object.values(ROLES),
//         n2: ROLES.USER,
//         required: false,
//       }),
//     })
//     .updateSchema({ role: { default: ROLES.ADMIN } })
//     .allSchema(),
// )
