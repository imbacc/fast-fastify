const Bean = require('./bean.js')			//抽象实体类
const config = require('./config.js')		//数据库配置
const resultful = require('./resultful.js')	//返回数据构造

const bean_list = config.bean
const bean_class = {}

//构造表结构 实体类
Object.keys(bean_list).forEach((key)=>{
	bean_class[key] = new Bean(bean_list[key])
})

//执行SQL事务封装
class exec {
	constructor(pool) {
		this.table = ''
		this.bean = null
		this.pool = pool
	}
	
	//执行SQL
	async call(sql,value,fun){
	    this.pool.getConnection(async (error,conn)=>{
	        if(error){
				console.log('conn err=',error)
				fun(resultful('WARN'))
	        }else{
	            conn.query(sql,value,(err,res,fields)=>{
					console.log('执行sql=',sql)
	                conn.release()
					if(err === null){
						fun(resultful('SUCCESS',res),fields)
					}else{
						fun(resultful('ERROR',err))
						console.log('query err=',err)
					}
	            })
	        }
	    })
	}
	
	//获取配置的表信息
	get_table(name){
		this.table = name
		this.bean = bean_class[name]
		return bean_class[name]
	}
	
	//获取所有配置表信息
	get_table_all(){
		return bean_class
	}
	
	//新增
	insert(...args){
		return `INSERT INTO ${this.table} (${this.bean.get_colum(['id'],'del')}) VALUES (${this.bean.get_join(args)});`
	}
	
	//更新
	update(obj,where = ''){
		return `UPDATE ${this.table} SET ${this.bean.get_value(obj)} ${where};`
	}
	
	//删除
	deleted(where = ''){
		return `DELETE FROM ${this.table} ${where};`
	}
	
	//查询
	select(list = [],type = 'del',where = ''){
		return `SELECT ${this.bean.get_colum(list,type)} FROM ${this.table} ${where};`
	}
}

module.exports = exec