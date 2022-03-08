import type { FastifyInstance } from 'fastify'

import mysqlDrive from 'mysql'
import Exec from './exec' //执行器封装
import { mysql } from '@/common/config' //数据库配置

// 复用
import { api_testSel } from '@/api/appinfo'
// sql 复用user的sql
const { test_connect } = api_testSel.sql

//创建连接池
const pool = mysqlDrive.createPool(mysql)
const exec = new Exec(pool)

export default (fastify: FastifyInstance) => {
  fastify.decorate('exec', exec)

  //初始化连接池 创建1个测试
  exec.call(test_connect).then((res) => console.log(res.code === 0 ? '开启连接池...' : '连接池开启失败...'))
}
