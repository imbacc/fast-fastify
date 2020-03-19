const resultful = require('../db/resultful.js')	//返回数据构造
const apitime = require('./apitime')			//API限流

//检测CMAKE令牌
const check_cmake = (fastify,head,req,reply,code = 'SUCCESS',next) => {
	if(code === 'SUCCESS'){
		const name = 'syscache_'+req.raw.originalUrl
		
		//读取是否 接口有redis缓存
		fastify.get_redis(name).then((cache)=>{
			if(cache) {
				// console.log('缓存 '+name)
				reply.send(cache)
			}else{
				next()
			}
		})
	}else{
		reply.code(500).send(resultful(code))
	}
}

//检测JWT令牌
const check_jwt = (fastify,head,req,reply,next) => {
	req.jwtVerify((err, decoded) => {
		if(decoded){
			check_cmake(fastify,head,req,reply,'SUCCESS',next)
		}else{
			//没有携带令牌时 判断是否时授权路由=> 检测true为是授予令牌的接口 ,否则返回状态码 WHEREIS_CRACK
			check_cmake(fastify,head,req,reply,req.req.url.indexOf('version') !== -1 ? 'SUCCESS' : 'WHEREIS_CRACK',next)
		}
	})
}

module.exports = (fastify) => {
	console.log('开启拦截器...')

	//请求
	fastify.addHook('onRequest', (req, reply, next) => {
		if(req.req.url === '/favicon.ico') {
			reply.code(404).send()
		}else{
			console.log({ url: req.req.url, params: {...req.query}, body: req.body , id: req.id }, '请求拦截...')
			const head = req.headers
			
			if(head.uuid === undefined){
				reply.code(401).send()
			}
			
			apitime(fastify,req.req.url,head.uuid).then((bool)=>{
				if(!bool){
					// console.log('终止请求...')
					reply.send(resultful('API_OutTime'))
				}else{
					check_jwt(fastify,head,req,reply,next)
				}
			})
		}
	})

	//预处理 - 当做响应拦截算了
	fastify.addHook('preHandler', (req, reply, next) => {
		console.log({ id: req.id },'响应拦截...')
		
		next()
	})

	//响应 找不到next方法
	// fastify.addHook('onResponse', (res, next) => {
	// 	console.log({ id: res.id },'响应拦截...')
	// 	console.log(res)
	// 	// next()
	// })
}
