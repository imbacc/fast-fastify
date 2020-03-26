const mysql = require('mysql')			//数据库驱动
const Exec = require('./exec')			//执行器封装
const config = require('./config')		//数据库配置

//创建连接池
const pool = mysql.createPool(config.mysql)

module.exports = (fastify) => {
  const exec = new Exec(pool)
  fastify.decorate('exec', exec)
  
  //初始化连接池 创建1个测试
  exec.get_table('app_info','select',[['id'],'save','limit 1']).then((res) => console.log(res.code === 1 ? '开启连接池...' : '连接池开启失败...'))
}