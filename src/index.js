const fastify = require('fastify')({logger: false})
const port = 3000	//默认端口
const ip = '127.0.0.1'

require('./common/decorate')(fastify) 	//注册装饰器
require('./common/intercept')(fastify) 	//注册拦截器
require('./common/throw')(fastify) 		//注册抛异常
require('./common/middle')(fastify) 	//注册中间件
require('./common/tools')(fastify) 		//注册插件 
require('./router/index')(fastify) 		//注册路由
require('./db/mysql')(fastify) 			//注册Mysql	不是fastify-mysql插件
require('./db/redis')(fastify) 			//注册Redis	不是fastify-redis插件

//启动服务	nodemon	index
fastify.listen(port, ip, (err)=>{
	if(err) throw err
	console.log(`服务指向IP: ${ip}`)
	console.log(`服务监听端口: ${port}`)
})