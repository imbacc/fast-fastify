const sf_key = 873243031

const format_data = () => {
	let date = new Date()
	let time = date.getTime()
	let year = date.getFullYear()
	let month = date.getMonth() + 1
	let day = date.getDate()
	
	month = (month < 10 ? '0'+month : month)
	day = day < 10 ?  '0'+day : day
	
	return year + '' + month + '' + day
}

const unmake_token_fun = async (cmake_token,fastify) => {
	
	if(cmake_token === undefined || cmake_token === '') return 'UNMAKETOKEN_NULL'
	if(cmake_token.indexOf('.') === -1) return 'UNMAKETOKEN_HASH'
	
	let unmake = 'cmaketoken_'+cmake_token
	
	let has_redis = await fastify.has_redis(unmake,cmake_token)
	if(has_redis) return 'UNMAKETOKEN_RUBBISH'
	
	let spl = cmake_token.split('.')
	let token = spl[0], random = spl[1], key = format_data()
	
	try{
		token = parseInt(token) - sf_key
		random = parseInt(random) - sf_key
		key = parseInt(key)
	}catch(e){
		console.log('转int类型出错')
		return 'UNMAKETOKEN_RUBBISH'
	}
	
	let is_token = token - key * random
	let sys_time = new Date().getTime()
	let mine = (sys_time - is_token) / 1000 / 60
	
	// console.log('time='+mine)
	// console.log('key='+key)
	// console.log('random='+random)
	// console.log('token='+token)
	
	if(mine > -1 && mine <= 1){
		// console.log('有效cmaketoken='+cmake_token)
		fastify.set_redis(unmake, cmake_token, (60 * 10)) //秒单位 60秒=1分钟 * 10
		return true
	}
	
	// console.log('失效cmaketoken='+cmake_token)
	return 'UNMAKETOKEN_ERROR'
}

module.exports = (fastify) => {
	fastify.decorate('unmake', (cmake_token) => unmake_token_fun(cmake_token,fastify))
}