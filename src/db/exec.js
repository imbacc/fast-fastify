const Bean = require('./bean')			//抽象实体类
const config = require('./config')		//数据库配置
const resultful = require('./resultful')	//返回数据构造

const bean_list = config.bean	//数据库表信息
const bean_class = {}			//表结构实体对象集合

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
	call(sql,value,fun){
	    this.pool.getConnection((error,conn)=>{
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
						console.log('query err=',err)
						fun(resultful('ERROR',err))
					}
	            })
	        }
	    })
	}
	
	call_async(sql,value){
		return new Promise((resolve)=> this.call(sql,value,(res)=> resolve(res)))
	}
	
	//获取配置的表信息
	get_table(name,fun_name = false,fun_arg = [],value = []){
		this.table = name
		this.bean = bean_class[name]
		if(fun_name){
			let sql = this[fun_name](...fun_arg)
			return new Promise((resolve,reject)=>{
				this.call(sql,value,(res)=> resolve(res))
			})
		}
		return this.bean
	}
	
	//获取所有表配置信息
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