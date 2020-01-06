//用户模块路由
module.exports = (fastify) => [
	{
	  method: 'GET',
	  url: '/login',
	  handler: (req, reply) => {
		reply.send({api: 'is login'})
	  }
	}
]