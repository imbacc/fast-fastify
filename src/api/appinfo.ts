// import type { apiRouter_DTYPE } from '#/api'

import { METHOD } from '@/common/config'
import testInfo from '@/entity/testInfo'

// xx/秒		默认30秒
// 次数			默认 30秒/15次
// 当前user统一限制 10秒/5次访问限制
const LIMIT: [number, number] = [10, 5]

// const routerList: apiRouter_DTYPE = {
const routerList = {
  api_testAdd: {
    url: '/add',
    method: METHOD.POST,
    limit: LIMIT,
    sql: {
      add_test: testInfo.crud_insert().getSql()
    },
    swagger: {
      summary: '我是新增接口',
      description: '新增接口的描述啊啊啊啊!'
    },
    schema: {
      body: testInfo.schema.pickSchema('id')
    }
  },
  api_testUpp: {
    url: '/upp',
    method: METHOD.POST,
    limit: LIMIT,
    sql: {
      update_test: testInfo.curd_updateById().getSql(),
      update_text_test: testInfo.pickKey('text').curd_updateById().getSql() // 根据id更新text属性
    },
    swagger: {
      summary: '我是更新接口 【跳过权限检测开启】',
      description: '更新接口的描述啊啊啊啊!'
    },
    schema: {
      body: testInfo.schema.pickSchema('text')
    }
  },
  api_testUpp2: {
    url: '/upp2',
    method: METHOD.POST,
    limit: LIMIT,
    swagger: {
      summary: '我是更新接口的克隆版',
      description: '更新接口的克隆版的描述啊啊啊啊!'
    },
    schema: {
      body: testInfo.schema.allSchema()
    }
  },
  api_testDel: {
    url: '/del',
    method: METHOD.DELETE,
    limit: LIMIT,
    sql: {
      delete_test: testInfo.curd_deleteById().getSql()
    },
    swagger: {
      summary: '我是删除接口',
      description: '删除接口的描述啊啊啊啊!'
    }
  },
  api_testSel: {
    url: '/sel',
    method: METHOD.GET,
    limit: LIMIT,
    sql: {
      select_test: testInfo.select().getSql(),
      test_connect: testInfo.pickKey('id').select('limit 1').getSql()
    },
    swagger: {
      summary: '我是查询接口！ 从api -> appinfo.js -> swagger 设置summary,description 简介和描述!',
      description: '查询接口的描述啊啊啊啊!'
    }
  },
  api_testFff: {
    url: '/fff',
    method: METHOD.GET,
    limit: LIMIT,
    skip: true // 跳过权限检测
  },
  api_testDdd: {
    url: '/ddd',
    method: METHOD.GET,
    limit: [10, 3],
    sql: {
      select: testInfo.curd_selectById().getSql(),
      select2: testInfo.omitKey('version').select('where id = ? and id > 0').getSql()
    }
  },
  api_testTtt: {
    url: '/ttt',
    method: METHOD.POST,
    onRequest: (reque: any, reply: any, done: Function) => {
      console.log('reque', reque)
      console.log('reply', reply)
      console.log('得经过老子!')
      done()
    }
  },
  api_testCache: {
    url: '/cache/:id',
    method: METHOD.GET,
    limit: [10, 5],
    // 路由选项文档 https://www.w3cschool.cn/fastify/fastify-ko5l35zk.html
    onRequest: (reque: any, reply: any, done: Function) => {
      // 箭头函数会破坏this实列对象
      // 开启浏览器缓存 Cache-control 3600秒
      console.log('reque', reque)
      reply.header('Cache-control', 'max-age=3600')
      reply.header('Last-Modified', new Date().toUTCString())
      done()
    },
    onResponse: function (reque: any, reply: any, done: Function) {
      // 该钩子总是在共享的 `onResponse` 钩子后被执行
      console.log('reque', reque)
      console.log('reply', reply)
      done()
    },
    preValidation: function (reque: any, reply: any, done: Function) {
      // 该钩子总是在共享的 `preValidation` 钩子后被执行
      console.log('reque', reque)
      console.log('reply', reply)
      done()
    },
    preHandler: function (reque: any, reply: any, done: Function) {
      // 该钩子总是在共享的 `preHandler` 钩子后被执行
      console.log('reque', reque)
      console.log('reply', reply)
      done()
    },
    preSerialization: (reque: any, reply: any, payload: any, done: Function) => {
      // 该钩子总是在共享的 `preSerialization` 钩子后被执行
      console.log('reque', reque)
      console.log('reply', reply)
      done(null, payload)
    }
  }
}

export default routerList
