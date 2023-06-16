import { TestService } from '@/service/testService'

const testService = new TestService()

console.log('%c [ testService.getEntity() ]-6', 'font-size:14px; background:#41b883; color:#ffffff;', testService.getEntity())
console.log('%c [ testService.getEntityVo() ]-7', 'font-size:14px; background:#41b883; color:#ffffff;', testService.getEntityVo())
// console.log('%c [ testService.getCurdSql() ]-8', 'font-size:14px; background:#41b883; color:#ffffff;', testService.getCurdSql())
// console.log('%c [ testService.getAppendKeySql() ]-9', 'font-size:14px; background:#41b883; color:#ffffff;', testService.getAppendKeySql())
// console.log('%c [ testService.getSetSql() ]-10', 'font-size:14px; background:#41b883; color:#ffffff;', testService.getSetSql())
// console.log('%c [ testService.getOmitKeySql() ]-11', 'font-size:14px; background:#41b883; color:#ffffff;', testService.getOmitKeySql())
// console.log('%c [ testService.getPickKeySql() ]-12', 'font-size:14px; background:#41b883; color:#ffffff;', testService.getPickKeySql())
// console.log('%c [ testService.getSchema() ]-13', 'font-size:14px; background:#41b883; color:#ffffff;', testService.getSchema())
