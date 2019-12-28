const movies = require('./module/movies')
const user = require('./module/user')
const def = [
	{
	  method: 'GET',
	  url: '/',
	  handler: async (request, reply) => {
	    return request.user
	  }
	}
]

const list = [def,movies,user]

module.exports = (fastify) => {
	console.time('生产路由')
	list.forEach((info)=> info.map((module)=> fastify.route(module))) //循环子模块路由配置 生产路由
	console.timeEnd('生产路由')
}