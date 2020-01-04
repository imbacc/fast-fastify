module.exports = (fastify) => [
	{
	  method: 'GET',
	  url: '/login',
	  handler: (req, reply) => {
		reply.send({api: 'is login'})
	  }
	}
]