import type { composeTable_DTYPE } from '#/composeTable'

// sql组合
class composeTable<T> implements composeTable_DTYPE {
  public table: string
  public list: Array<string>
  public bakList: Array<string>
  private sql: string
  public entity!: T

  constructor(tableName: string, keyList: Array<string> = [], removeKey: string | Array<string> = '') {
    this.table = tableName
    this.list = keyList
    this.bakList = keyList
    this.sql = ''

    // 初始化并筛选
    this.list = this.filterKey(removeKey).list
  }

  // 筛选key
  filterKey(removeKey: string | Array<string>) {
    if (!removeKey) return this
    if (typeof removeKey === 'string') {
      this.list = this.bakList.filter((key) => key !== removeKey)
    } else {
      this.list = this.bakList.filter((key) => !removeKey.includes(key))
    }
    return this
  }

  // 追加key
  appendKey(key: string | Array<string>) {
    if (typeof key === 'string') {
      this.list.push(key)
    } else {
      this.list.push(...key)
    }
    return this
  }

  // 清除key 跟append_key配合
  clearKey() {
    this.list = []
    return this
  }

  // ------------------基础功能

  // 新增
  insert() {
    this.sql += `INSERT INTO ${this.table} (${this.getColum(this.list)}) VALUES (${this.getJoin(this.list)});`
    return this
  }

  // 更新
  update(where = '') {
    this.sql += `UPDATE ${this.table} SET ${this.getValue(this.list)} ${where};`
    return this
  }

  // 删除
  deleted(where = '') {
    this.sql += `DELETE FROM ${this.table} ${where};`
    return this
  }

  // 查询
  select(where = '') {
    this.sql += `SELECT ${this.getColum(this.list)} FROM ${this.table} ${where};`
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
    return this.filterKey('id').insert()
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
    return this.filterKey('id').update('where id = ?')
  }

  // 根据ID删除
  curd_deleteById() {
    return this.deleted('where id = ?')
  }

  // 查询分页
  curd_selectByPage(where: string = '') {
    return this.select(`${where} limit ?,?`)
  }

  // 获取最终sql
  getSql() {
    const sql = this.sql
    this.sql = ''
    this.list = [...this.bakList]
    return sql
  }

  // 设置自定义sql
  setSql(sql: string) {
    this.clearKey()
    this.sql = `${sql};`
    return this
  }

  // SELECT key,key... FROM
  private getColum(list: Array<string> = []): string {
    return list.length > 0 ? [...new Set(list)].join(',') : '*'
  }

  // 获取并拼接 格式: key=?,key=?...
  private getValue(list: Array<string> = []): string {
    return list.length > 0 ? `${list.join('=?')}=?` : ''
  }

  // 获取相应数量拼接 格式: ?,?,?...
  private getJoin(list: Array<string> = []): string {
    return list.length > 0 ? Array(list.length).fill('?').join(',') : ''
  }
}

export default composeTable
