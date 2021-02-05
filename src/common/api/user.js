// method枚举
const METHOD = {
  POST: 'POST',
  GET: 'GET'
}

// xx/秒		默认30秒
// 次数			默认 30秒/15次
// 当前user统一限制 10秒/5 次访问限制
const LIMIT = [10, 5]

module.exports = {
  upp: {
    url: '/upp',
    method: METHOD.POST,
    limit: LIMIT,
    jump: true // 跳过权限检测
  },
  fff: {
    url: '/fff',
    method: METHOD.GET,
    limit: LIMIT
  },
  ddd: {
    url: '/ddd',
    method: METHOD.GET,
    limit: [10, 3]
  },
  ttt: {
    url: '/ttt',
    method: METHOD.POST
  },
  cache: {
    url: '/cache/:id',
    method: METHOD.GET,
    limit: [10, 5],
    // 路由选项文档 https://www.w3cschool.cn/fastify/fastify-ko5l35zk.html
    onRequest: (reque, reply, done) => {
      // 箭头函数会破坏this实列对象
      // 开启浏览器缓存 Cache-control 3600秒
      reply.header('Cache-control', 'max-age=3600')
      reply.header('Last-Modified', new Date().toUTCString())
      done()
    },
    onResponse: function (request, reply, done) {
      // 该钩子总是在共享的 `onResponse` 钩子后被执行
      done()
    },
    preValidation: function (request, reply, done) {
      // 该钩子总是在共享的 `preValidation` 钩子后被执行
      done()
    },
    preHandler: function (request, reply, done) {
      // 该钩子总是在共享的 `preHandler` 钩子后被执行
      done()
    },
    preSerialization: (request, reply, payload, done) => {
      // 该钩子总是在共享的 `preSerialization` 钩子后被执行
      done(null, payload)
    }
  }
}
