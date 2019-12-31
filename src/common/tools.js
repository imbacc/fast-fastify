module.exports = (fastify) => {
	
	//JWT令牌
	fastify.register(require('fastify-jwt'), {
	  secret: 'supersecret'
	})
	
	//数据库
	// fastify.register(require('../db/mysql.js'))
}