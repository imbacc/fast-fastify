import fs from 'node:fs'
import process from 'node:process'
import mysql from 'mysql'
import { mysqlConfig } from '../src/config/index'

// 转换表明格式 app_info -> AppInfo
function toPascalCase(str: string): string {
  return str.split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')
}

// 首字母小写 AppInfo -> appInfo
function firstLetterToLowercase(str) {
  return str.charAt(0).toLowerCase() + str.slice(1)
}

//  首字母大写 appInfo -> AppInfo
function firstLetterToUpcase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const connection = mysql.createConnection(mysqlConfig)

// 路由
function generateRouter(formatName: string, tableName: string) {
  const upLowName = firstLetterToLowercase(formatName)
  const content = `import type { router_DTYPE } from '#/router/modules'
  import type { request_DTYPE } from '#/global'
  import type { ${upLowName}Target_DTYPE } from '#/entity/${formatName}'
  \n

  import { resultful } from '@/common/resultful'
  import { logger, prisma } from '@/effect/index'
  import { ${formatName}Schema } from '@/entity/${formatName}'
  \n
  
  export default () => {
    const list: router_DTYPE = [
      {
        // 全局代理操作对象
        isProxy: true,
        prefix: '/${formatName}',
        limit: [10, 5], // 10秒/5次 访问限制
        swagger: {
          tags: ['${formatName}'],
        },
      },
      {
        url: '/findAll',
        method: 'GET',
        swagger: {
          summary: '查询所有数据',
          description: '查询所有数据description!',
        },
        handler: async (request: request_DTYPE<${upLowName}Target_DTYPE>, reply) => {
          const res = await prisma.${tableName}.findMany()
          reply.send(resultful('SUCCESS', res))
        },
      },
      {
        url: '/findOne',
        method: 'GET',
        swagger: {
          summary: '根据ID查询单个数据',
          description: '根据ID查询单个数据description!',
        },
        schema: {
          querystring: ${formatName}Schema.pickSchema('id'),
        },
        handler: async (request: request_DTYPE<${upLowName}Target_DTYPE>, reply) => {
          const res = await prisma.${tableName}.findUnique({ where: { id: request.query.id } })
          reply.send(resultful('SUCCESS', res))
        },
      },
      {
        url: '/save',
        method: 'POST',
        limit: [5, 5],
        swagger: {
          summary: '新增一条数据',
          description: '新增一条数据description!',
        },
        schema: {
          body: ${formatName}Schema.omitSchema('id'),
        },
        handler: async (request: request_DTYPE<${upLowName}Target_DTYPE>, reply) => {
          const res = await prisma.${tableName}.create({ data: Object.assign({}, request.body) })
          reply.send(resultful('SUCCESS', res))
        },
      },
      {
        url: '/delete',
        method: 'DELETE',
        limit: [5, 5],
        swagger: {
          summary: '删除一条数据',
          description: '删除一条数据description!',
        },
        schema: {
          body: ${formatName}Schema.pickSchema('id'),
        },
        handler: async (request: request_DTYPE<${upLowName}Target_DTYPE>, reply) => {
          const res = await prisma.${tableName}.delete({ where: { id: request.body.id } })
          reply.send(resultful('SUCCESS', res))
        },
      },
      {
        url: '/update',
        method: 'POST',
        limit: [5, 5],
        swagger: {
          summary: '更新一条数据',
          description: '更新一条数据description!',
        },
        schema: {
          body: ${formatName}Schema.getSchema(),
        },
        handler: async (request: request_DTYPE<${upLowName}Target_DTYPE>, reply) => {
          const res = await prisma.${tableName}.update({ where: { id: request.body.id }, data: Object.assign({}, request.body) })
          reply.send(resultful('SUCCESS', res))
        },
      },
      {
        url: '/count',
        method: 'GET',
        swagger: {
          summary: '统计数据',
          description: '统计数据description!',
        },
        handler: async (request: request_DTYPE<${upLowName}Target_DTYPE>, reply) => {
          const res = await prisma.${tableName}.count()
          reply.send(resultful('SUCCESS', res))
        },
      },
      {
        url: '/xxx/:id',
        method: 'GET',
        limit: [10, 5],
        handler: (request: request_DTYPE<${upLowName}Target_DTYPE>, reply) => {
          reply.send(resultful('SUCCESS', 'xxx/:id'))
        },
        // 路由选项文档 https://www.w3cschool.cn/fastify/fastify-ko5l35zk.html
        onRequest: (request, reply, done) => {
          // 箭头函数会破坏this实列对象
          // 开启浏览器缓存 Cache-control 3600秒
          reply.header('Cache-control', 'max-age=3600')
          reply.header('Last-Modified', new Date().toUTCString())
          done()
        },
        onResponse(request, reply, done) {
          // 该钩子总是在共享的 onResponse 钩子后被执行
          done()
        },
        preValidation(request, reply, done) {
          // 该钩子总是在共享的 preValidation 钩子后被执行
          done()
        },
        preHandler(request, reply, done) {
          // 该钩子总是在共享的 preHandler 钩子后被执行
          done()
        },
        preSerialization: (request, reply, payload, done) => {
          // 该钩子总是在共享的 preSerialization 钩子后被执行
          done(null, payload)
        },
      },
    ]
  return list
}

  `

  const filePath = `src/router/modules/${formatName}.ts`
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content)
    console.log('%c [ generateRouter path ]-87', 'font-size:14px; background:#41b883; color:#ffffff;', filePath)
  } else {
    fs.writeFileSync(`src/router/modules/${formatName}_${new Date().toLocaleDateString().replace(/\//g, '-')}.ts`, content)
  }
}

async function generateCreate() {
  connection.query('SHOW TABLES', (error, results) => {
    if (error) throw error

    const proAll: Promise<any>[] = []

    results.forEach((table: any) => {
      const pro = new Promise<void>((resolve) => {
        const tableName = table[`Tables_in_${connection.config.database}`]
        const formatName = firstLetterToLowercase(toPascalCase(tableName))

        connection.query(`
        SELECT
        COLUMN_NAME fieldName,#列名
        DATA_TYPE filedType, #字段类型
        COLUMN_TYPE columnType, #数据类型
        COLUMN_KEY isPrimaryKey,#是否主键
        CHARACTER_MAXIMUM_LENGTH textLength, #长度
        NUMERIC_PRECISION numberLength, #精度
        NUMERIC_SCALE numberDecimal, #小数位数
        IS_NULLABLE dontNull, #是否能为空
        COLUMN_DEFAULT defaultValue, #默认值
        COLUMN_COMMENT remarks #备注
        FROM INFORMATION_SCHEMA.COLUMNS
        where table_schema ='${mysqlConfig.database}' AND table_name = '${tableName}'
      `, (error) => {
          if (error) throw error
          console.log('%c [ generateRouter name ]', 'font-size:14px; background:#41b883; color:#ffffff;', formatName)
          generateRouter(formatName, tableName)

          resolve()
        })
      })
      proAll.push(pro)
    })

    Promise.allSettled(proAll).then(() => {
      process.exit()
    })
  })
}

generateCreate()