module.exports = (fastify) => {
	const movies = require('./module/movies')(fastify)
	const user = require('./module/user')(fastify)
	const list = [movies,user]
	
	console.time('生产路由')
	list.forEach((info)=> info.map((module)=> fastify.route(module))) //循环子模块路由配置 生产路由
	console.timeEnd('生产路由')
}