//版本模块路由
module.exports = (fastify) => [
	{
		method: 'GET',
		url: '/version',
		// preHandler: (request, reply, next) => {
		// 	request.headers.nocheck = true
		// 	console.log(request.headers)
		// 	next()
		// },
		handler: (req, reply) => {
			const exec = fastify.exec
			const token = fastify.jwt.sign({user:'111'})
			exec.get_table('app_info')
			const sql = exec.select([],'del','where id = ?')
			exec.call(sql,[req.query.id],(res)=> {
				res['token'] = fastify.jwt.sign({ uuid: req.headers.uuid, by: 'imbacc' }, { expiresIn: 60 * 60 * 1 })
				fastify.set_redis('syscache_'+req.raw.url,res,60 * 1)
				reply.send(res)
			})
		}
	}
]
