import { TestService } from '@/service/testService'
import { TestDtypeService } from '@/service/testDtypeService.bak'

const testService = new TestService()

console.log('%c [ testService.getCurdSql() ]-8', 'font-size:14px; background:#41b883; color:#ffffff;', testService.getCurdSql())
console.log('%c [ testService.getAppendKeySql() ]-9', 'font-size:14px; background:#41b883; color:#ffffff;', testService.getAppendKeySql())
console.log('%c [ testService.getSetSql() ]-10', 'font-size:14px; background:#41b883; color:#ffffff;', testService.getSetSql())
console.log('%c [ testService.getOmitKeySql() ]-11', 'font-size:14px; background:#41b883; color:#ffffff;', testService.getOmitKeySql())
console.log('%c [ testService.getPickKeySql() ]-12', 'font-size:14px; background:#41b883; color:#ffffff;', testService.getPickKeySql())
console.log('%c [ testService.getSchema() ]-13', 'font-size:14px; background:#41b883; color:#ffffff;', testService.getSchema())

const testDtypeService = new TestDtypeService()
console.log('%c [ testDtypeService ]-15', 'font-size:14px; background:#41b883; color:#ffffff;', testDtypeService)
// testDtypeService.add({ name: 'i am service', money: 100, date: '2020-01-01', json: 'i am json',  }).then((res) => {
// console.log('%c [ res ]-16', 'font-size:14px; background:#41b883; color:#ffffff;', res)
// })