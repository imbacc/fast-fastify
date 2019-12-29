module.exports = (fastify) => {
	
	//JWT令牌
	fastify.register(require('fastify-jwt'), {
	  secret: 'supersecret'
	})
}