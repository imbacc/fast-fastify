const resultful = require('./resultful') //返回数据构造
const { is_dev } = require('@/common/config.js')

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
   */
  call(sql, value, code) {
    const pool = this.pool
    return new Promise((resolve) => {
      pool.getConnection((error, conn) => {
        if (error) {
          console.log('conn err=', error)
          resolve(resultful('WARN'))
        } else {
          conn.query(sql, value, (err, res, fields) => {
            if (is_dev) console.log('执行sql=', sql, value)
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
                console.log('res', res)
                if (add_bool) res = affectedRows >= 1 ? { affectedRows, id: insertId } : false
                if (update_bool) res = changedRows >= 1 ? { changedRows } : affectedRows >= 1 ? { changedRows: 1 } : false
                if (delete_bool) res = affectedRows >= 1 ? { affectedRows } : false
              }
              resolve(code === 'result' ? res : resultful(code || 'SUCCESS', res), fields)
            } else {
              delete err.sql
              delete err.sqlState
              delete err.sqlMessage
              console.log('query err=', err)
              resolve(resultful('API_ERROR'))
            }
          })
        }
      })
    })
  }

  /**
   * 获取配置的表信息
   * name表明
   * fun_name insert,update,delete,select 字符串
   * 对应函数带入参数
   * sql参数
   */
  get_table(fun_name = '', fun_arg = [], value = []) {
    if (fun_name && this[fun_name]) return this.call(this[fun_name](...fun_arg), value)
  }

  /**
   * 新增
   * args参数 必须要和config配置的表信息长度一致 ['aa','bb'] 否则自己定义新增SQL语句
   */
  insert(table = '', list = []) {
    return `INSERT INTO ${table} (${this._get_colum(list)}) VALUES (${this._get_join(list)});`
  }

  /**
   * 更新
   * obj 为更新的字段名称 {aa:11,bb:22}
   * where 为更新条件
   */
  update(table = '', obj, where = '') {
    return `UPDATE ${table} SET ${this._get_value(obj)} ${where};`
  }

  //删除
  delete(table = '', where = '') {
    return `DELETE FROM ${table} ${where};`
  }

  /**
   * 查询
   * list 数组格式 ['aa','bb']
   * type del为删除算法 save为保留算法
   * where 查询条件
   */
  select(table = '', list = [], where = '') {
    return `SELECT ${this._get_colum(list)} FROM ${table} ${where};`
  }

  //////////// 下面是私有函数

  // ['字段']
  _get_colum(list = []) {
    let len = list.length
    if (len === 0) return '*'
    if (len > 0) list = [...new Set(list)]
    let join = list.join(',')
    return len > 1 ? join.substring(0, join.length) : join
  }

  //获取并拼接 格式: key=?,key=?   ...
  _get_value(args) {
    let value = ''
    if (args && Array.isArray(args)) {
      // Object.keys(args)
      args.forEach((key) => (value += key + '=?,'))
      return value.substring(0, value.length - 1)
    }
    return value
  }

  //获取相应数量拼接 格式: ?,?,?   ...
  _get_join(args) {
    let value = ''
    if (args.length > 0) {
      args.forEach((info) => (value += '?,'))
      return value.substring(0, value.length - 1)
    }
    return value
  }
}

module.exports = exec
