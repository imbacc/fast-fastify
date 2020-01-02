module.exports = (fastify) => [
	{
		method: 'GET',
		url: '/version',
		preHandler: (request, reply, next) => {
			console.log(request.headers.uuid)
			console.log(request.headers.cmaketoken)
			next()
		},
		handler: (request, reply) => {
			const exec = fastify.exec
			const token = fastify.jwt.sign({user:'111'})
			exec.get_table('app_info')
			const sql = exec.select([],'del','where id = ?')
			exec.call(sql,[request.query.id],(res)=> {
				reply.send(res)
			})
		}
	}
]
