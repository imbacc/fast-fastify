module.exports = {
	
	//mysql配置
	mysql:{
		host: '127.0.0.1',
		user: 'root',
		password: '123456',
		port: 3306,
		database: 'capp'
	},
	
	//redis配置
	redis:{
		host: '127.0.0.1',
		port: 6379,
	},
	
	//数据库表信息
	bean: {
		app_info:['id','text','version','os','ostext','linkurl'],
	},
	
	//开启redis api限流
	apitime: true,
}