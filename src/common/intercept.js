const resultful = require('../db/resultful.js')	//返回数据构造
const apitime = require('./apitime')			//API限流
const md5 = require('md5-node')

//检测CMAKE令牌
const check_cmake = (fastify,head,req,reply,code = 'SUCCESS',next) => {
	if(code === 'JUMP_CHECK'){
		console.log('跳过检测 token...')
		next()
		return
	}
	
	console.log({ id: req.id, code: code },'拦截状态...')
	
	if(code === 'SUCCESS'){
		let onlyid = md5(head.authorization) || ''
		let name = 'api_'+req.raw.originalUrl+'_'+onlyid
		console.log('api name=',name)
		
		if(req.req.method === 'GET'){
			//读取是否 接口有redis缓存
			fastify.get_redis(name).then((cache)=>{
				if(cache) {
					console.log('api cache='+name)
					reply.header('Cache-control', 'max-age=3600')
					reply.header('Last-Modified', new Date().toUTCString())
					reply.send(cache)
				}else{
					next()
				}
			})
		}else{
			//POST请求跳过检测缓存直接执行
			next()
		}
	}else{
		reply.code(500).send(resultful(code))
	}
}

//检测JWT令牌
const check_jwt = (fastify,head,req,reply,next) => {
	req.jwtVerify((err, decoded) => {
		//没有携带令牌时 判断是否时授权路由=> 检测true为是授予令牌的接口 ,否则返回状态码 WHEREIS_CRACK
		let state = req.req.url.indexOf('version') !== -1 ? 'JUMP_CHECK' : 'WHEREIS_CRACK';
        if(err && err.name === 'JsonWebTokenError') {
            reply.code(403).send(resultful('UNMAKETOKEN_RUBBISH'))
            return
        }
		if(err === null) state = 'SUCCESS'
		check_cmake(fastify,head,req,reply,state,next)
	})
}

module.exports = (fastify) => {
	console.log('开启拦截器...')

	//请求
	fastify.addHook('onRequest', (req, reply, next) => {
		let url = req.req.url
		if(url === '/favicon.ico') {
			reply.code(404).send()
		}else{
			console.log({ url: url, params: {...req.query}, body: req.body , id: req.id }, '请求拦截...')
			const head = req.headers,onlyid = md5(head.authorization) || ''
			
			apitime(fastify,url,onlyid).then((bool)=>{
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
	// fastify.addHook('preHandler', (req, reply, next) => {
	// 	console.log({ id: req.id },'响应拦截...')
	// 	next()
	// })

	//响应 找不到next方法
	// fastify.addHook('onResponse', (res, next) => {
	// 	console.log({ id: res.id },'响应拦截...')
	// 	console.log(res)
	// 	// next()
	// })
}
