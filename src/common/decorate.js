module.exports = (fastify) => {
	console.log('开启装饰器...')
	
	fastify.decorate('utility', () => {
	  // something very useful
	})
	
	fastify.decorate('conf', {
	  db: 'some.db',
	  port: 3000
	})
}