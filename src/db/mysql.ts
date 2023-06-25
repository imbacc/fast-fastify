import type { APIResultful_DTYPE } from '#/common/resultful'
import type { APICode } from '@/common/resultful'

import { resultful } from '@/common/resultful'
import mysqlDrive from 'mysql'
import { isDev, mysqlConfig } from '@/config'

import { logger } from '@/effect'

// 执行SQL事务封装
export class MysqlExecute {
  // 创建连接池
  private pool = mysqlDrive.createPool(mysqlConfig)

  constructor() {
    // 初始化连接池 创建1个测试
    this.pool.getConnection((error, connection) => {
      if (error) {
        logger.error(`msqyl error = ${error.message}`)
        return
      }

      logger.start('mysql pool start server success!')
      connection.release()
    })
  }

  /**
   * 执行SQL
   * sql 语句 select id form 表名 where id = ? and num = ?
   * value 数组格式传入 sql参数 [1,22]
   * then 回调函数
   * code 填写 NOTHINK_RESULT 不经过resultful直接返回结果
   */
  call(sql: string, value?: Array<any>, code?: keyof APICode): Promise<APIResultful_DTYPE> {
    const pool = this.pool
    return new Promise((resolve) => {
      pool.getConnection((error, connect) => {
        if (error) {
          logger.error(`mysql connect error = ${error.message}`)
          resolve(resultful('MYSQL_CONNECT_WARN'))
        } else {
          connect.query(sql, value, (err, res, _fields) => {
            if (isDev) {
              let val: Array<string> | '' = ''
              if (Array.isArray(value) && value.filter((f) => f).length > 0) val = value
              logger.info(`execute sql=${sql} val=[${val}]`)
            }
            connect.release()
            if (err === null) {
              sql = sql.toUpperCase()
              const selBool = ~sql.indexOf('SELECT')
              if (!selBool) {
                const addBool = ~sql.indexOf('INSERT INTO')
                const updateBool = ~sql.indexOf('UPDATE')
                const deleteBool = ~sql.indexOf('DELETE')
                let affectedRows = 0
                let changedRows = 0
                let insertId = 0
                if (Array.isArray(res)) {
                  const sum = res.reduce((t, v) => {
                    if (!t.affectedRows) t.affectedRows = 0
                    t.affectedRows += v.affectedRows
                    if (!t.changedRows) t.changedRows = 0
                    t.changedRows += v.changedRows
                    return t
                  }, {})
                  affectedRows = sum.affectedRows
                  changedRows = sum.changedRows
                } else {
                  affectedRows = res.affectedRows
                  changedRows = res.changedRows
                  insertId = res.insertId
                }
                if (addBool) res = affectedRows >= 1 ? { affectedRows, id: insertId } : false
                if (updateBool) res = changedRows >= 1 ? { changedRows } : affectedRows >= 1 ? { changedRows: 1 } : false
                if (deleteBool) res = affectedRows >= 1 ? { affectedRows } : false
              }
              resolve(code === 'NOTHINK_RESULT' ? res : resultful(code || 'SUCCESS', res))
            } else {
              logger.error(`mysql query error = ${err.message}`)
              resolve(resultful('API_ERROR'))
            }
          })
        }
      })
    })
  }

  // 根据对象键值排序返回对应值格式 { b: 2, a: 1 } -> { a: 1, b: 2 } -> [1, 2]
  getValues(targetValue: object | any, EndKey?: Array<string>) {
    const keys = Object.keys(targetValue).sort()
    const values: Array<string> = []

    keys.forEach((key) => {
      if (!EndKey?.includes(key)) {
        values.unshift(targetValue[key])
      } else {
        values.push(targetValue[key])
      }
    })
    return values
  }
}
