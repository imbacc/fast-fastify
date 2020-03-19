module.exports = (fastify) => {
	console.log('开启装饰器...')	//只配置静态
	
	fastify.decorate('config',{name:'test'})	//fastify.config.test
	
	fastify.decorate('fast_sql',(sql,val,time,fastify,req,reply) => {
		const exec = fastify.exec
		exec.call(sql,val,(res)=> {
			if(res.code === 1) fastify.set_redis(`api_${req.raw.url}`, res, time) //默认360分钟一个小时 60 * 60
			reply.send(res)
		})
	})
}