module.exports = (fastify) => {
	console.log('开启装饰器...')	//只配置静态
	
	fastify.decorate('config',{name:'test'})	//fastify.config.test
}