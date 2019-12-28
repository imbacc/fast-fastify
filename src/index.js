const fastify = require('fastify')({logger: false})
const port = 3000	//默认端口

require('./common/intercept')(fastify) 	//注册拦截器
require('./common/decorate')(fastify) 	//注册装饰器
require('./common/throw')(fastify) 		//注册抛异常
require('./common/middle')(fastify) 	//注册中间件
require('./common/tools')(fastify) 		//注册插件 
require('./router/index')(fastify) 		//注册路由

//启动服务
fastify.listen(port, (err)=>{
	if (err) throw err
	console.log(`服务监听端口: ${port}...`)
})