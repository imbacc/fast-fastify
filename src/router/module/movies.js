module.exports = (fastify) => [{
	method: 'GET',
	url: '/movies/index',
	handler: (req, reply) => {
		reply.send({
			api: 'is movies'
		})
	}
}]
