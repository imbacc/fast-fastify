const Redis = require('redis')		//Redis驱动
const config = require('./config')	//Redis配置
const synch = require('./redis_synch')

const redis = Redis.createClient(config.redis.port, config.redis.host)
redis.on('error', (err) => console.log('redis err='+err))

const get_redis = async (key) => {
	const p = new Promise((resolve, reject) => {
		redis.get(key,(err, res) => resolve(res))
	})
	
	const then = await p.then((res)=>{
		console.log('pp.then=',res)
		return res
	})
	
	return then
}

const set_redis = (key, value, time) => {
	redis.set(key, value)
	if(time) redis.expire(key, time)
}

const has_redis = async (key,two) => {
	const p = new Promise((resolve, reject) => {
		redis.get(key,(err, res) => resolve((res === two)))
	})
	
	const then = await p.then((res)=>{
		console.log('pp.then=',res)
		return res
	})
	
	return then
}

module.exports = (fastify) => {
	// let d = await get_redis('cmaketoken_128589188387259.879530641')
	// console.log('d=',d)
	
	fastify.decorate('get_redis', get_redis)
	fastify.decorate('set_redis', set_redis)
	fastify.decorate('has_redis', has_redis)
}

