import fs from 'node:fs'
import process from 'node:process'
import mysql from 'mysql'
import { mysqlConfig } from '../src/config/index'

const connection = mysql.createConnection(mysqlConfig)

// INT integer
// BIGINT integer
// FLOAT number
// DOUBLE number
// DECIMAL number
// CHAR string
// VARCHAR string
// TEXT string
// ENUM string
// DATE string(format: date)
// TIME string(format: time)
// DATETIME string(format: date - time)
// TIMESTAMP string(format: date - time)
// BOOLEAN boolean
// JSON object

const typeTodtype = {
  int: 'integer_DTYPE',
  bigint: 'integer_DTYPE',
  float: 'number_DTYPE',
  double: 'number_DTYPE',
  decimal: 'number_DTYPE',
  char: 'string_DTYPE',
  varchar: 'string_DTYPE',
  text: 'string_DTYPE',
  enum: 'string_DTYPE',
  date: 'string_DTYPE',
  time: 'string_DTYPE',
  datetime: 'string_DTYPE',
  timestamp: 'string_DTYPE',
  boolean: 'integer_DTYPE',
  json: 'string_DTYPE',
}

const tsType = {
  integer_DTYPE: 'number',
  number_DTYPE: 'number',
  string_DTYPE: 'string',
  object_DTYPE: 'object',
  array_DTYPE: 'any[]',
}

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

// function clearEntity() {
//   const proAll: Promise<any>[] = []
//   const directory = './types/entity'

//   fs.readdir(directory, (err, files) => {
//     if (err) throw err

//     for (const file of files) {
//       const pro = new Promise<void>((resolve) => {
//         fs.unlink(path.join(directory, file), (err) => {
//           if (err) throw err
//           resolve()
//         })
//       })
//       proAll.push(pro)
//     }
//   })

//   return Promise.allSettled(proAll)
// }

// 实体类型的声明
function generateDtype(formatTableName, fields) {
  const lowercaseTableName = firstLetterToLowercase(formatTableName)
  const types = fields.map((item) => {
    return `  ${item.fieldName}${item.dontNull === 'YES' ? '?' : ''}: ${typeTodtype[item.filedType]}`
  }).join('\n')

  const types2 = fields.map((item) => {
    return `  ${item.fieldName}: ${tsType[typeTodtype[item.filedType]]}`
  }).join('\n')

  const content = `import type { string_DTYPE, number_DTYPE, integer_DTYPE, array_DTYPE, object_DTYPE, entity_DTYPE } from '../compose/entity'\n
export interface ${formatTableName}_DTYPE {
${types}
}

export interface ${formatTableName}Target_DTYPE {
${types2}
}
`
  fs.writeFileSync(`types/entity/${lowercaseTableName}.d.ts`, content)
  console.log('%c [ generateDtype path ]-87', 'font-size:14px; background:#41b883; color:#ffffff;', `types/entity/${lowercaseTableName}.d.ts`)
}

// 实体的属性 和 vo
function generateEntity(formatTableName, fields) {
  const lowercaseTableName = firstLetterToLowercase(formatTableName)
  const types = fields.map((item) => {
    const dtype = typeTodtype[item.filedType]

    const entityStr = `  ${item.fieldName}: ${dtype} = {
    description: '${item.remarks}',
    type: '${dtype.replace('_DTYPE', '')}',
    ${item.dontNull === 'YES' ? 'required: true,' : ''}${item.isPrimaryKey === 'PRI' ? 'primaryKey: true,' : ''}`

    if (dtype === 'string_DTYPE') {
      // maxLength: ${item.filedType === 'datetime' ? 20 : item.textLength},${item.filedType === 'datetime' ? 'defaultFormat: \'date-time\',' : ''}${item.filedType === 'date' ? 'defaultFormat: \'date\',' : ''}${item.filedType === 'time' ? 'defaultFormat: \'time\',' : ''}
      return `${entityStr}${item.dontNull === 'YES' ? 'minLength: 1,' : ''}
  }
`
    } else if (dtype === 'number_DTYPE' || dtype === 'integer_DTYPE') {
      return `${entityStr}${item.dontNull === 'YES' ? 'minimum: 1,' : ''}maximum: ${Number.parseInt(Array(item.numberLength).fill(9).join(''))},
  }
  `
    }
  }).join('\n')

  const content = `import type { integer_DTYPE, number_DTYPE, string_DTYPE, object_DTYPE } from '#/compose/entity'
import type { ${formatTableName}_DTYPE } from '#/entity/${lowercaseTableName}'\n
import { tableFactory, schemaFactory } from '@/compose/composeFactory'\n
export class ${formatTableName} implements ${formatTableName}_DTYPE {
${types}
}

export class ${formatTableName}Vo implements Partial<${formatTableName}_DTYPE> {
${types}
}

export const ${lowercaseTableName}Table = tableFactory<${formatTableName}>(${formatTableName})
export const ${lowercaseTableName}Schema = schemaFactory<${formatTableName}>(${formatTableName})
export const ${lowercaseTableName}SchemaVo = schemaFactory<${formatTableName}Vo>(${formatTableName}Vo)
`
  fs.writeFileSync(`src/entity/${lowercaseTableName}.ts`, content)
  console.log('%c [ generateEntity path ]-87', 'font-size:14px; background:#41b883; color:#ffffff;', `src/entity/${lowercaseTableName}.ts`)
}

async function generateCreate() {
  // await clearEntity()

  connection.query('SHOW TABLES', (error, results) => {
    if (error) throw error

    const proAll: Promise<any>[] = []

    results.forEach((table: any) => {
      const pro = new Promise<void>((resolve) => {
        const tableName = table[`Tables_in_${connection.config.database}`]
        const formatTableName = toPascalCase(tableName)

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
      `, (error, fields) => {
          if (error) throw error
          console.log('%c [ generateTable name ]', 'font-size:14px; background:#41b883; color:#ffffff;', formatTableName)
          generateDtype(formatTableName, fields)
          generateEntity(formatTableName, fields)

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