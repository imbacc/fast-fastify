# fast-fastify

> 依赖于 fastify 框架，搭建架构!

## yarn install

### 测试需要先创建数据库 -> 创建数据库名 test -> 导入 app_info.sql 语句执行

```
yarn install && yarn run dev
```

or

```
npm install && npm run dev
```

## fastify 文档说明： <https://www.w3cschool.cn/fastify/>

```
  ├── node_modules                依赖包
  ├── src                         源码
  │   ├── common                  结构
  │   │      ├── plugins                插件文件夹
  │   │      ├── api.js                 api接口配置
  │   │      ├── apitime.js             利用缓存限流
  │   │      ├── config.js              配置信息
  │   │      ├── decorate.js            装饰器
  │   │      ├── intercept.js           拦截器
  │   │      ├── middle.js              中间件
  │   │      ├── plugin.js              定义插件
  │   │      ├── throw.js               异常处理
  │   ├── db                      数据库
  │   │    ├── exec.js                  执行SQL事务封装
  │   │    ├── mysql.js                 架入mysql驱动
  │   │    ├── redis.js                 架入redis驱动
  │   │    ├── resultful.js             定义枚举返回格式
  │   ├── router                  路由
  │   │      ├── module                 路由子模块文件夹
  │   │      ├── index.js               路由入口文件
  │   ├── index.js                fastify入口
  ├── .gitignore                  git忽略提交目录
  ├── .prettierignore             prettier忽略格式化目录
  ├── .prettierrc.js              prettier配置信息
  ├── app_info.sql                测试sql
  ├── package.json                依赖包及配置信息文件
```
