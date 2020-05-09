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
	
	/**
	* 执行SQL
	* sql 语句 select id form 表名 where id = ? and num = ?
	* value 数组格式传入 sql参数 [1,22]
	* fun 回调函数
	*/
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
	
    /**
    * 以Promise执行call函数
    * sql 语句 select id form 表名 where id = ? and num = ?
    * value 数组格式传入 sql参数 [1,22]
    * then 返回内容
    */
	call_async(sql,value){
		return new Promise((resolve)=> this.call(sql,value,(res)=> resolve(res)))
	}
	
	/**
	 * 获取配置的表信息
	 * name表明
	 * fun_name insert,update,deleted,select 字符串
	 * 对应函数带入参数
	 * sql参数
	 */
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
	
	/**
	 * 新增
	 * args参数 必须要和config配置的表信息长度一致 ['aa','bb'] 否则自己定义新增SQL语句
	 */
	insert(...args){
		return `INSERT INTO ${this.table} (${this.bean.get_colum(['id'],'del')}) VALUES (${this.bean.get_join(args)});`
	}
	
	/**
	 * 更新
	 * obj 为更新的字段名称 {aa:11,bb:22}
	 * where 为更新条件
	 */
	update(obj,where = ''){
		return `UPDATE ${this.table} SET ${this.bean.get_value(obj)} ${where};`
	}
	
	//删除
	deleted(where = ''){
		return `DELETE FROM ${this.table} ${where};`
	}
	
	/**
	 * 查询
	 * list 数组格式 ['aa','bb']
	 * type del为删除算法 save为保留算法
	 * where 查询条件
	 */
	select(list = [],type = 'del',where = ''){
		return `SELECT ${this.bean.get_colum(list,type)} FROM ${this.table} ${where};`
	}
}

module.exports = exec