class composeTable {
  private table: string
  private list: Array<string>
  private bakList: Array<string>
  private sql: string

  constructor(tableName: string, keyList: Array<string> = [], removeKey?: string) {
    this.table = tableName
    this.list = keyList
    this.bakList = keyList
    this.sql = ''
    // 初始化并筛选
    this.list = this.filter_key(removeKey).list
  }

  // 筛选key
  filter_key(removeKey: string | Array<string>) {
    if (!removeKey) return this
    if (removeKey as string) this.list = this.bakList.filter((key) => key !== removeKey)
    if (removeKey as Array<string>) this.list = this.bakList.filter((key) => !removeKey.includes(key))
    return this
  }

  // 追加key
  append_key(key: string | Array<string>) {
    if (key as string) this.list.push(key as string)
    if (key as Array<string>) this.list.push(...key)
    return this
  }

  // 清除key 跟append_key配合
  clear_key() {
    this.list = []
    return this
  }

  // ------------------基础功能

  // 新增
  insert() {
    this.sql += `INSERT INTO ${this.table} (${_get_colum(this.list)}) VALUES (${_get_join(this.list)});`
    return this
  }

  // 更新
  update(where = '') {
    this.sql += `UPDATE ${this.table} SET ${_get_value(this.list)} ${where};`
    return this
  }

  // 删除
  deleted(where = '') {
    this.sql += `DELETE FROM ${this.table} ${where};`
    return this
  }

  // 查询
  select(where = '') {
    this.sql += `SELECT ${_get_colum(this.list)} FROM ${this.table} ${where};`
    return this
  }

  // 统计
  count(where = '') {
    this.sql += `SELECT count(id) as count FROM ${this.table} ${where};`
    return this
  }

  // --------------------特点CRUD功能

  // 新增一条记录
  crud_insert() {
    return this.filter_key('id').insert()
  }

  // 查询所有
  crud_selectAll() {
    return this.select()
  }

  // 根据ID查询
  curd_selectById() {
    return this.select('where id = ?')
  }

  // 根据ID更新
  curd_updateById() {
    return this.filter_key('id').update('where id = ?')
  }

  // 根据ID删除
  curd_deleteById() {
    return this.deleted('where id = ?')
  }

  // 查询分页
  curd_selectByPage(where: string) {
    return this.select(`${where} limit ?,?`)
  }

  // --------------------结果result
  // 获取最终sql
  get_sql() {
    const sql = this.sql
    this.sql = ''
    this.list = [...this.bakList]
    return sql
  }
}

export default composeTable

//////////// 下面是私有函数

// ['字段']
const _get_colum = (list: Array<string> = []): string => {
  let len = list.length
  if (len === 0) return '*' // 不推荐list不填
  if (len > 0) list = [...new Set(list)]
  let join = list.join(',')
  return len > 1 ? join.substring(0, join.length) : join
}

//获取并拼接 格式: key=?,key=?   ...
const _get_value = (list: Array<string> = []): string => {
  let value = ''
  if (list.length > 0) {
    list.forEach((key) => (value += key + '=?,'))
    return value.substring(0, value.length - 1)
  }
  return value
}

//获取相应数量拼接 格式: ?,?,?   ...
const _get_join = (list: Array<string> = []): string => {
  let value = ''
  if (list.length > 0) {
    list.forEach(() => (value += '?,'))
    return value.substring(0, value.length - 1)
  }
  return value
}
