import { AppInfoTable, AppInfoSchema } from '@/entity/AppInfo'
import { TestInfoTable } from '@/entity/TestInfo'

export class TestInfoService {
  constructor() {
    console.log('%c [ AppInfoSchema ]-7', 'font-size:14px; background:#41b883; color:#ffffff;', AppInfoSchema.getSchema())
  }

  addTest() {
    const appsql = AppInfoTable.crudInsert().getSql()
    const testSql = TestInfoTable.crudInsert().getSql()
    return `${appsql}${testSql}`
  }

  updateTest() {
    return TestInfoTable.curdUpdateById().getSql()
  }

  updateTest2() {
    return TestInfoTable.omitKey('text').curdUpdateById().getSql()
  }

  deleteTest() {
    return TestInfoTable.delete().curdSelectById().getSql()
  }
}