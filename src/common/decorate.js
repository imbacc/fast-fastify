const md5 = require('md5-node')

module.exports = (fastify) => {
	console.log('开启装饰器...')	//只配置静态
	
	fastify.decorate('config',{name:'test'})	//fastify.config.test
	
	fastify.decorate('cache_sql',(sql,val,time,req) => {
        return fastify.exec.call_async(sql,val).then((res)=> {
            const onlyid = md5(req.headers.authorization) || ''
            if(res.code === 1) fastify.set_redis(`api_${req.raw.originalUrl}_${onlyid}`, res, time) //默认360分钟一个小时 60 * 60
            return res
        })
	})
}