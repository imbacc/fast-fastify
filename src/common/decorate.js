module.exports = (fastify) => {
	console.log('开启装饰器...')
	
	fastify.decorate('mysql', require('./mysql'))
}