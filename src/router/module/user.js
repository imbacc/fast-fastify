module.exports = (fastify) => [
	{
	  //
	  method: 'GET',
	  url: '/signup',
	  handler:async (request, reply) => {
		let token = fastify.jwt.sign({ foo: 'bar' })
		reply.send(token)
	  }
	},
	{
	  method: 'GET',
	  url: '/login',
	  handler:async (request, reply) => {
		reply.send({api: 'is login'})
	  }
	}
]