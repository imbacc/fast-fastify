module.exports = (fastify) => {
	console.log('开启装饰器...')
	
	fastify.decorate('is_fastify', fastify)
	
	fastify.decorate('conf', {
	  db: 'some.db',
	  port: 3000
	})
}