const resultful = require('../db/resultful.js')	//返回数据构造
const apitime = require('./apitime')			//API限流

module.exports = (fastify) => {
	console.log('开启拦截器...')

	//请求
	fastify.addHook('onRequest', (req, reply, next) => {
		if(req.req.url === '/favicon.ico') {
			reply.code(404).send()
		}else{
			console.log({ url: req.req.url, params: {...req.query}, body: req.body , router_id: req.id }, '请求拦截...')
			const head = req.headers
			
			if(head.uuid === undefined){
				reply.code(401).send()
			}
			
			apitime(fastify,req.req.url,head.uuid).then((bool)=>{
				console.log('bool=',bool)
				if(!bool){
					// console.log('终止请求...')
					reply.code(403).send()
				}else{
					let code = 'SUCCESS'
					fastify.unmake(head.cmaketoken).then((unmake)=>{
						if(unmake !== true){
							code = unmake
						}else if(head.uuid === undefined){
							code = 'IsNull' 
						}else if(head.uuid.length < 12 || head.uuid.length > 30){
							code = 'ValNoCode'
						}
						
						if(code === 'SUCCESS'){
							next()
						}else{
							reply.send(resultful(code))
						}
					})
				}
			})
		}
	})

	//预处理 - 当做响应拦截算了
	fastify.addHook('preHandler', (request, reply, next) => {
		console.log({ id: req.id, code: code },'响应拦截...')
		next()
	})

	//响应 找不到next方法
	// fastify.addHook('onResponse', (res, next) => {
	// 	console.log({ id: res.id },'响应拦截...')
	// 	next()
	// })
}
