//版本模块路由
module.exports = (fastify) => [
	{
		method: 'GET',
		url: '/version',
		handler: (req, reply) => {
			const token = fastify.jwt.sign({ uuid: 1008611, by: 'imbacc' }, { expiresIn: 60 * 60 * 1 })
			fastify.exec.get_table('app_info','select',[[],'del','where id = ?'],[req.query.id]).then((res)=>{
				 res['token'] = token
				 reply.send(res)
			})
		},
		schema: {
			querystring: {
				id: {type: 'number'}
			}
		},
	}
]
