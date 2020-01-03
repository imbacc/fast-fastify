module.exports = (fastify) => {
	
	//JWT令牌
	fastify.register(require('fastify-jwt'), { secret: 'supersecret' })
	
	//自己封装的令牌
	require('./unmake')(fastify)
	
}