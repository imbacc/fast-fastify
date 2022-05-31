import { globalMemory } from '@/common/globalMemory'

import mysqlDrive from 'mysql'
import Exec from './exec' //执行器封装
import { mysql } from '@/common/config' //数据库配置

// 复用
import testInfo from '@/entity/testInfo'

const testInfoSql = {
  testConnect: testInfo.pickKey('id').crud_selectAll().getSql()
}

//创建连接池
const pool = mysqlDrive.createPool(mysql)
const exec = new Exec(pool)

export default () => {
  globalMemory.initExec(exec)
  //初始化连接池 创建1个测试
  exec.call(testInfoSql.testConnect).then((res) => console.log(res.code === 0 ? 'Mysql开启连接池...' : 'Mysql连接池开启失败...'))
}
