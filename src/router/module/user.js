module.exports = (fastify) => [
	{
	  //
	  method: 'GET',
	  url: '/signup',
	  handler: (request, reply) => {
		const token = fastify.jwt.sign({ foo: 'bar' })
		reply.send(token)
	  }
	},
	{
	  method: 'GET',
	  url: '/login',
	  handler: (request, reply) => {
		reply.send({api: 'is login'})
	  }
	}
]