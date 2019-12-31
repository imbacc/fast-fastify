module.exports = (fastify) => [{
	method: 'GET',
	url: '/movies',
	handler:async (request, reply) => {
		reply.send({
			api: 'is movies'
		})
	}
}]
