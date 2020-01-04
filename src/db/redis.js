const Redis = require('redis')		//Redis驱动
const config = require('./config')	//Redis配置

const redis = Redis.createClient(config.redis.port, config.redis.host)
redis.on('error', (err) => console.log('redis err='+err))

const get_redis = async (key) => {
	const p = new Promise((resolve, reject) => {
		redis.get(key,(err, res) => {
			try{
				res = JSON.parse(res)
			}catch(e){
				
			}
			resolve(res)
		})
	})
	
	return await p.then((res) => res)
}

const set_redis = (key, value, time) => {
	redis.set(key, typeof value === 'object' ? JSON.stringify(value) : value)
	if(time) redis.expire(key, time)
}

const has_redis = async (key,two) => {
	const p = new Promise((resolve, reject) => {
		redis.get(key,(err, res) => resolve((res === two)))
	})
	
	return await p.then((res) => res)
}

module.exports = (fastify) => {
	// let d = await get_redis('cmaketoken_128589188387259.879530641')
	// console.log('d=',d)
	
	fastify.decorate('get_redis', get_redis)
	fastify.decorate('set_redis', set_redis)
	fastify.decorate('has_redis', has_redis)
}

