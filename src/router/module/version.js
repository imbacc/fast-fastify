//版本模块路由
module.exports = (fastify) => [
	{
		method: 'GET',
		url: '/version',
		handler: (req, reply) => {
			const header = req.headers
			const name = `api_${header.uuid}_${req.raw.url}`
			
			fastify.get_redis(name).then((cache)=>{
				if(cache){
					reply.send(cache)
				}else{
					const exec = fastify.exec
					//by :xxx 变量和值自己定义作为密匙
					const token = fastify.jwt.sign({ uuid: header.uuid, by: 'xxxx' }, { expiresIn: 60 * 60 * 1 })
					exec.get_table('app_info','select',[[],'del','where id = ?'],[req.query.id]).then((res)=>{
						 res['token'] = token
						 fastify.set_redis(name,res,60)
						 reply.send(res)
					})
				}
			})
		},
		schema: {
			querystring: {
				id: {type: 'number'}
			},
		},
	}
]
