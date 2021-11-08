const mysqlDrive = require('mysql') //数据库驱动
const Exec = require('./exec.js') //执行器封装
const { mysql } = require('@/common/config.js') //数据库配置

// 复用
const { api_testSel } = require('@/api/appinfo.js')
// api
const api = require('@/api/token.js')
// sql 复用user的sql
const { test_connect } = api_testSel.sql

//创建连接池
const pool = mysqlDrive.createPool(mysql)
const exec = new Exec(pool)

module.exports = (fastify) => {
  fastify.decorate('exec', exec)

  //初始化连接池 创建1个测试
  exec.call(test_connect).then((res) => console.log(res.code === 0 ? '开启连接池...' : '连接池开启失败...'))
}
