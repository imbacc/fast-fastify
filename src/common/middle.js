module.exports = (fastify) => {
	console.log('开启中间件...')
	fastify.use(require('cors')())
	fastify.use(require('hide-powered-by')())
	fastify.use(require('x-xss-protection')())
}