module.exports = (fastify) => {
	console.log('开启拦截器...')

	fastify.addHook('onRequest', async (req, reply, next) => {
		// some code
		console.log('onRequest...')
		// console.log(req.jwtVerify())
		console.log({ url: req.req.url, id: req.id }, 'received request')
		if(req.req.url === '/') next()
		// const decoded = fastify.jwt.verify(token)
		// try {
		// 	await req.jwtVerify()
		// } catch (err) {
		// 	console.log('jwt err=',err)
		// }
		next()
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
