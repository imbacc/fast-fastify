module.exports = {
	
	//数据库连接配置
	config:{
		host: '127.0.0.1',
		user: 'root',
		password: '123456',
		port: 3306,
		database: 'capp'
	},
	
	//数据库表信息
	bean: {
		app_info:['id','text','version','os','ostext','linkurl'],
		
	}
}