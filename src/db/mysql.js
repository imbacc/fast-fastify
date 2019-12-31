const mysql = require('mysql')			//数据库驱动
const Exec = require('./exec.js')		//执行器封装
const config = require('./config.js')	//数据库配置

//创建连接池
const pool = mysql.createPool(config.config)

module.exports = (fastify) => {
  const exec = new Exec(pool)
  fastify.decorate('exec', exec)
  
  //初始化连接池 创建1个 避免第一次创建长时间
  exec.get_table('app_info')
  const sql = exec.select(['id'],'save','where id = 1')
  exec.call(sql,[],(res)=> console.log(res ? '开启连接池...' : '连接池开启失败...'))
}