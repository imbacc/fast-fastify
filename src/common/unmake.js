const sf_key = 873243031

const format_data = () => {
	let date = new Date()
	let time = date.getTime()
	let year = date.getFullYear()
	let month = ((date.getMonth()+1) < 10 ? '0'+(date.getMonth()+1) : (date.getMonth()+1))
	let day = date.getDate() < 10 ?  '0'+date.getDate() : date.getDate()
	
	return (year + '' + month + '' + day)
}

const unmake_token_fun = (cmake_token,fastify) => {
	
	if(cmake_token === undefined || cmake_token === '') return 'UNMAKETOKEN_NULL'
	if(cmake_token.indexOf('.') === -1) return 'UNMAKETOKEN_NULL'
	
	let unmake = 'cmaketoken_'+cmake_token
	
	let state = {res:false}
	let d = fastify.has_redis(unmake,cmake_token).then((res)=>{
		console.log('then=',res)
		state.res = res
		
		if(state.res) return 'UNMAKETOKEN_HASH'
	})
	
	let d_then = d.then((res)=>{
		console.log('d.then=',res)
		return res
	})
	
	console.log('dd=',JSON.stringify(d))
	console.log('d_then=',d_then)
	
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
		fastify.cache.set(unmake,cmake_token, (60 * 60 * 24)) //秒单位 60秒=1分钟 * 60分钟=1小时 * 24小时=1天
		return true
	}
	
	// console.log('失效cmaketoken='+cmake_token)
	return 'UNMAKETOKEN_RUBBISH'
}

module.exports = (fastify) => {
	fastify.decorate('unmake', (cmake_token) => unmake_token_fun(cmake_token,fastify))
}