const fs = require('fs')
const filelist = fs.readdirSync('./router/module/')

module.exports = (fastify) => {
	const list = [
		require('./module/user')(fastify),		//用户模块路由
		require('./module/movies')(fastify),	//影视模块路由
		require('./module/version')(fastify),	//版本模块路由
	]
	
	// const modulesFiles = require.context('./module', true, /\.js$/)
	// console.log(modulesFiles)
	
	console.time('生产路由')
	list.forEach((info)=> info.map((module)=> fastify.route(module))) //循环子模块路由配置 生产路由
	console.timeEnd('生产路由')
	
	// console.log(list)	//打印所有路由
}