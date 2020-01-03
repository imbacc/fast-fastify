const resultful = require('../db/resultful.js')	//返回数据构造

module.exports = (fastify) => {
	console.log('开启拦截器...')

	//请求
	fastify.addHook('onRequest', (req, reply, next) => {
		if(req.req.url === '/favicon.ico') {
			reply.code(404).send()
		}else{
			console.log({ url: req.req.url, params: {...req.query}, body: req.body , router_id: req.id }, '请求拦截...')
			
			// fastify.cache.get(req.headers.uuid)
			next()
		}
		// const decoded = fastify.jwt.verify(token)
		// try {
		// 	await req.jwtVerify()
		// } catch (err) {
		// 	console.log('jwt err=',err)
		// }
	})

	//预处理 - 当做响应拦截算了
	fastify.addHook('preHandler', (request, reply, next) => {
		let code = 'SUCCESS'
		const head = request.headers
		fastify.unmake(head.cmaketoken).then((unmake)=>{
			if(unmake !== true){
				code = unmake
			}else if(head.uuid === undefined){
				code = 'IsNull' 
			}else if(head.uuid.length < 12){
				code = 'ValNoCode'
			}
			
			console.log({ id: request.id, code: code },'响应拦截...')
			
			if(code === 'SUCCESS'){
				next()
			}else{
				reply.send(resultful(code))
			}
		})
	})

	//响应 找不到next方法
	// fastify.addHook('onResponse', (res, next) => {
	// 	console.log({ id: res.id },'响应拦截...')
	// 	next()
	// })
}
