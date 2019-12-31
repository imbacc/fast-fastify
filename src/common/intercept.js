module.exports = (fastify) => {
	console.log('开启拦截器...')

	//请求
	fastify.addHook('onRequest', (req, reply, next) => {
		if(req.req.url === '/favicon.ico') {
			reply.code(404).send()
		}else{
			console.log({ url: req.req.url, id: req.id }, '请求拦截...')
			next()
		}
		// const decoded = fastify.jwt.verify(token)
		// try {
		// 	await req.jwtVerify()
		// } catch (err) {
		// 	console.log('jwt err=',err)
		// }
	})

	//过手
	// fastify.addHook('preHandler', (request, reply, next) => {
	// 	// some code
	// 	console.log('preHandler...')
	// 	next()
	// })

	//响应
	fastify.addHook('onResponse', (res, next) => {
		console.log({ id: res.id },'响应拦截...')
	})
}
