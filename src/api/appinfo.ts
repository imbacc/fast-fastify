import type { apiRouter } from '#/api'

import { METHOD } from '@/common/config'
import schema from '@/schema/appinfo'
import tokenSchema from '@/schema/token'
import composeTable from '@/common/composeTable'

// xx/秒		默认30秒
// 次数			默认 30秒/15次
// 当前user统一限制 10秒/5次访问限制
const LIMIT: [number, number] = [10, 5]

// `id` int(11) NOT NULL AUTO_INCREMENT,
// `text` varchar(200) DEFAULT NULL,
// `version` int(11) DEFAULT NULL,
// `os` int(1) DEFAULT NULL,
// `ostext` varchar(5) DEFAULT NULL,
// `linkurl` varchar(300) DEFAULT NULL,
const key_list = ['id', 'text', 'version', 'os', 'ostext', 'linkurl']
const table = new composeTable('app_info', key_list)

const routerList: apiRouter = {
  api_testAdd: {
    url: '/add',
    method: METHOD.POST,
    limit: LIMIT,
    sql: {
      add_test: table.crud_insert().get_sql()
    },
    swagger: {
      summary: '我是新增接口',
      description: '新增接口的描述啊啊啊啊!'
    },
    schema: {
      body: schema.add_schema
    }
  },
  api_testUpp: {
    url: '/upp',
    method: METHOD.POST,
    limit: LIMIT,
    sql: {
      update_test: table.curd_updateById().get_sql(),
      update_text_test: table.clear_key().append_key('text').curd_deleteById().get_sql() // 清除key 只更新text属性根据id更新
    },
    swagger: {
      summary: '我是更新接口 【跳过权限检测开启】',
      description: '更新接口的描述啊啊啊啊!'
    },
    schema: {
      body: schema.update_schema
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
      body: schema.update_schema
    }
  },
  api_testDel: {
    url: '/del',
    method: METHOD.DELETE,
    limit: LIMIT,
    sql: {
      delete_test: table.curd_deleteById().get_sql()
    },
    swagger: {
      summary: '我是删除接口',
      description: '删除接口的描述啊啊啊啊!'
    },
    schema: {
      body: tokenSchema.id_schema
    }
  },
  api_testSel: {
    url: '/sel',
    method: METHOD.GET,
    limit: LIMIT,
    sql: {
      select_test: table.select().get_sql(),
      test_connect: table.clear_key().append_key('id').select('limit 1').get_sql()
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
    jump: true // 跳过权限检测
  },
  api_testDdd: {
    url: '/ddd',
    method: METHOD.GET,
    limit: [10, 3],
    sql: {
      select: table.curd_selectById().get_sql(),
      select2: table.filter_key('version').select('where id = ? and id > 0').get_sql()
    }
  },
  api_testTtt: {
    url: '/ttt',
    method: METHOD.POST,
    onRequest: (reque: any, reply: any, done: Function) => {
      console.log('reque', reque)
      console.log('reply', reply)
      // console.log('得经过老子!')
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
