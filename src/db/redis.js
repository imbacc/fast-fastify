module.exports = (fastify) => {
	fastify.decorate('cache', {
		get: async (key,fun) => {
			let value = await fastify.redis.get(key).then((res) => res)
			console.log('value=',value)
		},
		set: (key, value, time) => {
			fastify.redis.set(key, value)
			if(time) fastify.redis.expire(key, time)
		}
	})
}
