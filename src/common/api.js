// 枚举 目前支持 'DELETE'、'GET'、'HEAD'、'PATCH'、'POST'、'PUT' 以及 'OPTIONS'。它还可以是一个 HTTP 方法的数组。
const METHOD = {
  POST: 'POST',
  GET: 'GET'
}

const user = {
  upp: {
    url: '/upp',
    method: METHOD.POST
  },
  fff: {
    url: '/fff',
    method: METHOD.GET
  },
  ddd: {
    url: '/ddd',
    method: METHOD.GET
  },
  ttt: {
    url: '/ttt',
    method: METHOD.POST
  },
  cache: {
    url: '/cache/:id',
    method: METHOD.GET,
    qqqwww: [10, 5],
    onRequest: (reque, reply, done) => {
      // 箭头函数会破坏this实列对象
      // 开启浏览器缓存 Cache-control 3600秒
      reply.header('Cache-control', 'max-age=3600')
      reply.header('Last-Modified', new Date().toUTCString())
      done()
    }
  },
  onResponse: function (request, reply, done) {
    // 该钩子总是在共享的 `onResponse` 钩子后被执行
    done()
  },
  preParsing: function (request, reply, done) {
    // 该钩子总是在共享的 `preParsing` 钩子后被执行
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

const version = {
  version: {
    url: '/version',
    method: METHOD.GET
  }
}

module.exports = {
  user,
  version
}
