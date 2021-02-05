const table = process?.env?.CREATE_TABLE?.trim() || false
const env = table || process?.env?.NODE_ENV?.trim() || 'dev'
const md5 = require('md5-node')
console.log('env=', env)

// 定义全局属性
// global.base64 = (str) => Buffer.from(str).toString('base64') //base64加密
// global.base64_re = (str) => Buffer.from(str, 'base64').toString() //base64解密
global.api_cache = {} // api接口缓存
global.api_limit = {} // api限流设置 '路由名字':[每秒,次数]
global.jump_auth = new Map() // 跳过权限检测
global.add_map = (jump = []) => {
  //路由不检测 jwt权限
  const map = global.jump_auth
  jump.forEach((key) => map.set(key, true))
  return map
}

// 赋予路由跳过检测权限
const check_auth = {
  dev: ['/version'],
  prod: ['/version']
}

// 初始化执行
global.add_map(check_auth[env])

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
      description: 'swagger api description...'
    },
    host: 'auto', // auto为listen_config 端口 ip
    apiKey: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header'
    },
    tags: [
      { name: 'user', description: '这里是用户接口模块' },
      { name: 'version', description: '这里是授权接口模块' }
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
