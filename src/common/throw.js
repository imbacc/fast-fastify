module.exports = (fastify) => {
	console.log('开启抛异常...')
	
	fastify.setNotFoundHandler((request, reply)=>{
		console.log('try 404...')
		// console.log(request)
		// console.log(reply)
	})
	
	fastify.setErrorHandler((error, reply)=>{
		console.log('try error...')
		console.log(error)
		// console.log(reply)
	})
}