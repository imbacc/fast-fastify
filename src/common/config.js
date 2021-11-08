const env = process.env.NODE_ENV || 'dev'
const md5 = require('md5-node')
console.log('env=', env)
console.log('env=', env === 'dev')

// 注入global全局变量和函数
require('./global.js')

// method枚举
const METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
}

// 赋予路由跳过检测权限
const check_auth = {
  dev: ['/token'],
  prod: ['/token']
}

// 初始化执行
global.add_jump(check_auth[env])

// 端口信息
const listen_config = {
  dev: {
    port: 3000, // 默认端口
    ip: '127.0.0.1', // 指定监听的地址 当部署在 Docker 或其它容器上时，明智的做法是监听 0.0.0.0
    queue: 511 // 指定积压队列的大小
  },
  prod: {
    port: 3000,
    ip: '127.0.0.1',
    queue: 511
  }
}

// 全局配置
const jwt_config = {
  dev: md5('imbacc'),
  prod: md5('by imbacc')
}

// mysql
const mysql_config = {
  dev: {
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'test'
  },
  prod: {
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'test'
  }
}

// redis
const redis_config = {
  dev: {
    host: '127.0.0.1',
    port: 6379
  },
  prod: {
    host: '127.0.0.1',
    port: 6379
  }
}

// 每个接口限流 也可在Nginx上限流
const apitime_config = {
  dev: {
    open: true, // 或 -> Boolean(env === 'dev')
    time: 30,
    count: 15
  },
  prod: {
    open: true,
    time: 30,
    count: 15
  }
}

// swagger信息
const swagger_config = {
  dev: {
    use: true,
    route: `/swagger/${md5('地址加密')}`,
    info: {
      title: 'REST API',
      version: '1.0.0',
      description: 'swagger api description... 授权格式: Authorization: Bearer token'
    },
    host: 'auto', // auto为listen_config 端口 ip
    apiKey: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header'
    },
    tags: [
      { name: 'appinfo', description: '这里是appinfo接口模块' },
      { name: 'token', description: '这里是授权接口模块' }
    ],
    externalDocs: {
      description: '查看fastify文档',
      url: 'https://www.w3cschool.cn/fastify/fastify-zopy35zj.html'
    }
  },
  prod: {
    use: false // 不注册
    // route: `/swagger/${md5('地址加密')}`,
    // info: {
    //   title: 'REST API',
    //   version: '1.0.0',
    //   description: 'swagger api description...'
    // },
    // host: 'auto',
    // apiKey: {
    //   type: 'apiKey',
    //   name: 'Authorization',
    //   in: 'header'
    // }
  }
}

// 按需导出
module.exports.mysql = mysql_config[env]
module.exports.redis = redis_config[env]
module.exports.jwtkey = jwt_config[env]
module.exports.apitime = apitime_config[env]
module.exports.listen = listen_config[env]
module.exports.swagger = swagger_config[env]
module.exports.is_dev = Boolean(env === 'dev')
module.exports.METHOD = METHOD
