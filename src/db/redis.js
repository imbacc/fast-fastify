const Redis = require('redis')		//Redis驱动
const config = require('./config')				//Redis配置

const redis = Redis.createClient(config.redis.port, config.redis.host)
redis.on('error', (err) => console.log('redis err='+err))

const get_redis = (key) => {
	const p = new Promise((resolve, reject) => {
		redis.get(key,(err, res) => resolve(res))
	})
	
	return p
}

const set_redis = (key, value, time) => {
	redis.set(key, value)
	if(time) redis.expire(key, time)
}

const has_redis = (key,two) => {
	const p = new Promise((resolve, reject) => {
		redis.get(key,(err, res) => resolve((res === two)))
	})
	
	return p
}

// const copy_redis = function* (key){
// 	get_redis(key).then((res)=>{
// 		console.log('then=',res)
// 		yield res
// 	})
// }


module.exports = (fastify) => {
	// let dd = copy_redis('cmaketoken_128589188387259.879530641')
	// console.log('dd=',dd.next())
	fastify.decorate('get_redis', get_redis)
	fastify.decorate('set_redis', set_redis)
	fastify.decorate('has_redis', has_redis)
}

