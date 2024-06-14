# fast-fastify
### fastify 文档： https://fastify.dev/ https://www.w3cschool.cn/fastify/

## pnpm install

```
# node 18.12.1
# npm 9.4.0
# pnpm 8.15.3

pnpm i && pnpm run dev
```

> 基础使用流程,先创建数据库表,可使用Chat2DB快速构建关系 https://github.com/chat2db/Chat2DB

```
# 获取数据库信息并生成新的prisma客户端
pnpm prisma introspect
pnpm prisma db pull
或者使用
pnpm run prisma:pull
-----------------------------
prisma generate
-----
# 在执行以下命令生成schema实体类和路由
pnpm run create
# 或者以下分解的命令
pnpm run c-entity
pnpm run c-router
```

### prisma 命令 https://prisma.yoga/concepts
```
命令	描述
init	初始化项目和配置文件
generate	生成客户端
introspect	从数据库生成客户端
validate	检验Prisma Schema 文件
format	格式化 Prisma Scheam 文件
```

## primsa db
```
命令  描述
db pull	提取模型并同步到 Prisma 模型，生成 Prisma Client新的客户端
db push	将 Prisma 数据模型中的更改应用到数据库，即将数据模型同步到数据库中
db seed	使用数据填充脚本或种子数据文件来初始化数据库，将初始数据插入到数据库中
db execute	执行原始 SQL 查询或命令以与数据库交互
```

## prisma 迁移和重置
```
命令	描述
migrate dev	在开发模式下运行迁移
migrate reset	重置数据库，将数据库恢复到初始状态
migrate deploy	部署迁移，将已生成的迁移文件应用到数据库以更新模
migrate resolve	解决冲突，手动解决与数据库迁移相关的冲突或问题
migrate status	显示数据库状态，检查当前数据库与迁移历史的一致性
migrate diff	生成数据库模式的变更差异，与已应用的迁移历史进行比较
```
