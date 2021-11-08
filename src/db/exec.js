const resultful = require('./resultful') //返回数据构造
const { is_dev } = require('@/common/config.js')
const log = async (...args) => console.log(...args)

//执行SQL事务封装
class exec {
  constructor(pool) {
    this.pool = pool
  }

  /**
   * 执行SQL
   * sql 语句 select id form 表名 where id = ? and num = ?
   * value 数组格式传入 sql参数 [1,22]
   * then 回调函数
   * result 不经过resultful直接返回结果 默认false
   */
  call(sql, value, code) {
    const pool = this.pool
    return new Promise((resolve) => {
      pool.getConnection((error, conn) => {
        if (error) {
          log('conn err=', error)
          resolve(resultful('WARN'))
        } else {
          conn.query(sql, value, (err, res, fields) => {
            if (is_dev) log('执行sql=', sql, value === undefined ? '' : value)
            conn.release()
            if (err === null) {
              sql = sql.toUpperCase()
              const sel_bool = ~sql.indexOf('SELECT')
              if (!sel_bool) {
                const add_bool = ~sql.indexOf('INSERT INTO')
                const update_bool = ~sql.indexOf('UPDATE')
                const delete_bool = ~sql.indexOf('DELETE')
                let affectedRows = 0,
                  changedRows = 0,
                  insertId = 0
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
                if (add_bool) res = affectedRows >= 1 ? { affectedRows, id: insertId } : false
                if (update_bool) res = changedRows >= 1 ? { changedRows } : affectedRows >= 1 ? { changedRows: 1 } : false
                if (delete_bool) res = affectedRows >= 1 ? { affectedRows } : false
              }
              resolve(code === 'result' ? res : resultful(code || 'SUCCESS', res), fields)
            } else {
              if (!is_dev) {
                delete err.sql
                delete err.sqlState
                delete err.sqlMessage
              }
              console.log('query err=', err)
              resolve(resultful('API_ERROR'))
            }
          })
        }
      })
    })
  }
}

module.exports = exec
