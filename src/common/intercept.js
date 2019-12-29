module.exports = (fastify) => {
	console.log('开启拦截器...')

	fastify.addHook('onRequest', async (req, reply, next) => {
		// some code
		if(req.req.url !== '/favicon.ico') {
			console.log('onRequest...')
			console.log({ url: req.req.url, id: req.id }, 'received request')
			next()
		}
		// const decoded = fastify.jwt.verify(token)
		// try {
		// 	await req.jwtVerify()
		// } catch (err) {
		// 	console.log('jwt err=',err)
		// }
		
	})

	// fastify.addHook('preHandler', (request, reply, next) => {
	// 	// some code
	// 	console.log('preHandler...')
	// 	next()
	// })

	fastify.addHook('onResponse', (res, next) => {
		// some code
		console.log('onResponse...')
	})
}
