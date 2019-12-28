module.exports = (fastify) => [
	{
	  method: 'GET',
	  url: '/movies',
	  handler: (request, reply) => {
	    reply.send({api: 'is movies'})
	  }
	}
]