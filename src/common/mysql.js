const mysql = require('mysql')

//创建连接池
const pool = mysql.createPool({
	host: '47.106.120.145',
	user: 'root',
	password: 'okingc123456789',
	port: 3306,
	database: 'capp',
	connectTimeout: 6,
})

module.exports = {
	query:async (sql,fun)=>{
	    pool.getConnection(async (error,conn)=>{
	        if(error){
	            fun(error,false,false)
	        }else{
	            conn.query(sql,async (err,res,fields)=>{
	                conn.release()
	                fun(err,res,fields)
	            })
	        }
	    })
	}
}