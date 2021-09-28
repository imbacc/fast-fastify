// method枚举
const METHOD = {
  POST: 'POST',
  GET: 'GET',
  DELETE: 'DELETE'
}

// xx/秒		默认30秒
// 次数			默认 30秒/15次
// 当前user统一限制 10秒/5次访问限制
const LIMIT = [10, 5]

// 表暴露字段
const column = {
  /**
   * id int(11)
   * text varchar(200)
   * version int(11)
   * os int(1)
   * ostext varchar(5)
   * linkurl varchar(300)
   */
  app_info: ['id', 'text', 'version', 'os', 'ostext', 'linkurl']
}

module.exports = {
  column,
  add: {
    url: '/add',
    method: METHOD.POST,
    limit: LIMIT,
    table: [
      'insert',
      ['app_info', [...column.app_info.slice(1, 6)]],
      ['slice去除了id,当前是text内容', 100, 5, 'add接口', '通过add接口添加,我是linkurl字段']
    ],
    swagger: {
      summary: '我是新增接口',
      description: '新增接口的描述啊啊啊啊!'
    }
  },
  upp: {
    url: '/upp',
    method: METHOD.POST,
    limit: LIMIT,
    jump: true, // 跳过权限检测
    table: ['update', ['app_info', ['text'], 'where id = ?'], ['text', 1]],
    swagger: {
      summary: '我是更新接口 【跳过权限检测开启】',
      description: '更新接口的描述啊啊啊啊!'
    }
  },
  upp2: {
    url: '/upp2',
    method: METHOD.POST,
    limit: LIMIT,
    swagger: {
      summary: '我是更新接口的克隆版',
      description: '更新接口的克隆版的描述啊啊啊啊!'
    }
  },
  del: {
    url: '/del',
    method: METHOD.DELETE,
    limit: LIMIT,
    table: ['delete', ['app_info', 'where id = ?']],
    swagger: {
      summary: '我是删除接口',
      description: '删除接口的描述啊啊啊啊!'
    }
  },
  sel: {
    url: '/sel',
    method: METHOD.GET,
    limit: LIMIT,
    table: ['select', ['app_info', [...column.app_info], 'where id > ?'], ['text', 1]],
    swagger: {
      summary: '我是查询接口',
      description: '查询接口的描述啊啊啊啊!'
    }
  },
  fff: {
    url: '/fff',
    method: METHOD.GET,
    limit: LIMIT
  },
  ddd: {
    url: '/ddd',
    method: METHOD.GET,
    limit: [10, 3],
    sql: 'select * from app_info where id > ?'
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
