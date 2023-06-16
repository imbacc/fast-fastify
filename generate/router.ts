// // 实体的属性 和 vo
// function generateEntity(formatTableName, fields) {
//   const types = fields.map((item) => {
//     const dtype = typeTodtype[item.filedType]

//     const entityStr = `  ${item.fieldName}: ${dtype} = {
//     desc: '${item.remarks}',
//     type: '${dtype.replace('_DTYPE', '')}',
//     ${item.dontNull === 'YES' ? 'required: true,' : ''}${item.isPrimaryKey === 'PRI' ? 'primaryKey: true,' : ''}`

//     if (dtype === 'string_DTYPE') {
//       return `${entityStr}${item.dontNull === 'YES' ? 'minLength: 1,' : ''}maxLength: ${item.filedType === 'datetime' ? 16 : item.textLength},${item.filedType === 'datetime' ? 'defaultFormat: \'date-time\',' : ''}${item.filedType === 'date' ? 'defaultFormat: \'DATE\',' : ''}${item.filedType === 'time' ? 'defaultFormat: \'TIME\',' : ''}
//   }
// `
//     } else if (dtype === 'number_DTYPE' || dtype === 'integer_DTYPE') {
//       return `${entityStr}${item.dontNull === 'YES' ? 'minimum: 1,' : ''}maximum: ${Number.parseInt(Array(item.numberLength).fill(9).join(''))},
//   }
//   `
//     }
//   }).join('\n')

//   const entityContent = `import type { integer_DTYPE, number_DTYPE, string_DTYPE, object_DTYPE } from '#/compose/entity'
// import type { ${formatTableName}_DTYPE } from '#/entity/${formatTableName}'\n
// import { tableFactory, schemaFactory } from '@/compose/composeFactory'\n
// export class ${formatTableName} implements ${formatTableName}_DTYPE {
// ${types}
// }
// export class ${formatTableName}Vo implements Partial<${formatTableName}_DTYPE> {
// ${types}
// }
// export const ${formatTableName}Table = tableFactory<${formatTableName}>(${formatTableName})
// export const ${formatTableName}Schema = schemaFactory<${formatTableName}, ${formatTableName}Vo>(${formatTableName}, ${formatTableName}Vo)`
//   fs.writeFileSync(`src/entity/${formatTableName}.ts`, entityContent)
//   console.log('%c [ generateDtype path ]-87', 'font-size:14px; background:#41b883; color:#ffffff;', `src/entity/${formatTableName}.ts`)
// }

// async function generateCreate() {
//   // await clearEntity()

//   connection.query('SHOW TABLES', (error, results) => {
//     if (error) throw error

//     const proAll: Promise<any>[] = []

//     results.forEach((table: any) => {
//       const pro = new Promise<void>((resolve) => {
//         const tableName = table[`Tables_in_${connection.config.database}`]
//         const formatTableName = toPascalCase(tableName)

//         connection.query(`
//         SELECT
//         COLUMN_NAME fieldName,#列名
//         DATA_TYPE filedType, #字段类型
//         COLUMN_TYPE columnType, #数据类型
//         COLUMN_KEY isPrimaryKey,#是否主键
//         CHARACTER_MAXIMUM_LENGTH textLength, #长度
//         NUMERIC_PRECISION numberLength, #精度
//         NUMERIC_SCALE numberDecimal, #小数位数
//         IS_NULLABLE dontNull, #是否能为空
//         COLUMN_DEFAULT defaultValue, #默认值
//         COLUMN_COMMENT remarks #备注
//         FROM INFORMATION_SCHEMA.COLUMNS
//         where table_schema ='${mysqlConfig.database}' AND table_name = '${tableName}'
//       `, (error, fields) => {
//           if (error) throw error
//           console.log('%c [ fields ]-22', 'font-size:14px; background:#41b883; color:#ffffff;', fields)

//           console.log('%c [ generateTableName ]', 'font-size:14px; background:#41b883; color:#ffffff;', formatTableName)
//           generateDtype(formatTableName, fields)
//           generateEntity(formatTableName, fields)

//           resolve()
//         })
//       })
//       proAll.push(pro)
//     })

//     Promise.allSettled(proAll).then(() => {
//       process.exit()
//     })
//   })
// }

// generateCreate()