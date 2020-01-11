//版本模块路由
module.exports = (fastify) => [
	{
		method: 'GET',
		url: '/version',
		handler: (req, reply) => {
			const header = req.headers
			const exec = fastify.exec
			const token = fastify.jwt.sign({ uuid: header.uuid, by: 'imbacc' }, { expiresIn: 60 * 60 * 1 })
			exec.get_table('app_info')
			const sql = exec.select([],'del','where id = ?')
			exec.call(sql,[req.query.id],(res)=> {
				res['token'] = token
				fastify.set_redis(`api_version_${header.uuid}_${req.raw.url}`,res,60 * 1)
				reply.send(res)
			})
		}
	}
]
