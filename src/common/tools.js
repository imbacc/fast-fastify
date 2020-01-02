module.exports = (fastify) => {
	
	//JWT令牌
	fastify.register(require('fastify-jwt'), { secret: 'supersecret' })
	
	//Redis缓存
	fastify.register(require('fastify-redis'), { host: '127.0.0.1' })
	
	//自己封装的令牌
	require('./unmake')(fastify)
	
}