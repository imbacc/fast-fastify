# fast-fastify

当前为 ts 为版本 js 版本为 jsBranch 分支 git clone -b jsBranch git@github.com:imbacc/fast-fastify.git

> 依赖于 fastify 框架，搭建架构!

## pnpm install

### 测试需要先创建数据库 -> 创建数据库名 test -> 导入 sql 文件夹下 \*.sql 语句执行

```
pnpm install && pnpm run dev
```

## fastify 文档说明： <https://www.w3cschool.cn/fastify/>

```
  ├── node_modules                依赖包
  ├── src                         源码
  │   ├── api                     api目录相当于请求Action
  │   │      ├── xxx                  各个分类的定义
  │   ├── common                  结构
  │   │      ├── apitime             利用node缓存限流
  │   │      ├── composeTable        sql组合拼装 相当于orm对象生成sql 自己写了组合 没有基于对象到对象操作 比较轻 需要有良好的sql基础
  │   │      ├── config              配置信息
  │   │      ├── decorators          ts的元注释装饰器 听说隐藏坑比较多 不推荐
  │   │      ├── entityFactory       实体工厂类 用于数据库的表机构实体 操作生成sql或者生成schema
  │   │      ├── globalMemory        相当于global内存对象
  │   │      ├── intercept           请求响应拦截器
  │   │      ├── middle              中间件
  │   │      ├── plugin              定义插件
  │   │      ├── schemaReduce        基于实体类生成对应schema
  │   │      ├── throw               异常处理
  │   ├── db                      数据库
  │   │    ├── exec                  执行SQL事务封装
  │   │    ├── mysql                 架入mysql驱动
  │   │    ├── redis                 架入redis驱动
  │   │    ├── resultful             定义枚举返回格式
  │   ├── router                  实体类对象
  │   │      ├── xxx                 基于pnpm run mysql-ts生成的数据库表 实体类
  │   ├── router                  路由
  │   │      ├── module              路由子模块文件夹
  │   │      ├── index               路由入口文件
  │   ├── index                fastify入口
  ├── .gitignore                  git忽略提交目录
  ├── .prettierignore             prettier忽略格式化目录
  ├── .prettierrc              prettier配置信息
  ├── packageon                依赖包及配置信息文件
```
