//用户模块路由
module.exports = (fastify) => [
    {
      method: 'POST',
      url: '/login',
      handler: (req, reply) => {
        fastify.exec.get_table('app_info', 'update', [{'text':'text'},'where id = ?'], ['这里是text内容',1]).then((res) => {
            //只有内容跟数据库不一致 changedRows才会有效
            if(res.code === 1 && res.data.changedRows > 0){
                reply.send(res)
            }else{
                res['data'] = null
                reply.send(res)
            }
        })
      }
    },
    {
      method: 'GET',
      url: '/fff',
      handler: (req, reply) => {
          //缓存到redis 60分钟 只GET请求缓存!
          fastify.cache_sql('select * from app_info where id > ?',[0],60,req).then((res)=>{
             reply.send(res)
          })
      }
    },
    {
      method: 'GET',
      url: '/ddd',
      handler: (req, reply) => {
          //调用exec执行类执行 call_async 函数Promise回调
          fastify.exec.call_async('select * from app_info where id > ?',[0]).then((res)=> {
             reply.send(res)
          })
      }
    }
]