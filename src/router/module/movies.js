module.exports = [
	{
	  method: 'GET',
	  url: '/movies',
	  handler: (request, reply) => {
	    reply.send({api: 'is movies'})
	  }
	}
]