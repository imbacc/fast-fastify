// sql组合
export class ComposeTable<T> {
  // 表名
  private tableName: string
  // 生产sql集合字段
  private tableKeyList: Array<keyof T>
  // 原有sql集合字段
  private tableKeyListBak: Array<keyof T>
  // sql语句
  private sql: string

  constructor(tableName: string, keyList: Array<keyof T> = [], omitKey?: keyof T | Array<keyof T>) {
    this.tableName = tableName
    this.tableKeyList = keyList
    this.tableKeyListBak = keyList
    this.sql = ''

    // 初始化并筛选
    if (omitKey) this.tableKeyList = this.omitKey(omitKey).tableKeyList
  }

  // 获取表名
  getTableName() {
    return this.tableName
  }

  // 选中key
  pickKey(key: keyof T | Array<keyof T>, keyList?: Array<keyof T>) {
    if (!key) return this
    if (!keyList) keyList = this.tableKeyListBak
    if (typeof key === 'string') key = [key]
    this.tableKeyList = keyList.filter((f) => (key as Array<keyof T>).includes(f))
    return this
  }

  // 排除key
  omitKey(key: keyof T | Array<keyof T>, keyList?: Array<keyof T>) {
    if (!key) return this
    if (!keyList) keyList = this.tableKeyListBak
    if (typeof key === 'string') key = [key]
    this.tableKeyList = keyList.filter((f) => !(key as Array<keyof T>).includes(f))
    return this
  }

  // 追加key
  appendKey(key: string | Array<string>) {
    if (typeof key === 'string') key = [key]
    this.tableKeyList.push(...(key as Array<keyof T>))
    return this
  }

  // 清除key 跟append_key配合
  clearKey() {
    this.tableKeyList = []
    return this
  }

  // ------------------基础功能

  // 新增
  insert() {
    this.sql += `INSERT INTO ${this.tableName} (${this.getColumn(this.tableKeyList)}) VALUES (${this.getColumnJoin(this.tableKeyList)});`
    return this
  }

  // 更新
  update(where = '') {
    this.sql += `UPDATE ${this.tableName} SET ${this.getColumnMerge(this.tableKeyList)} ${where};`
    return this
  }

  // 删除
  delete(where = '') {
    this.sql += `DELETE FROM ${this.tableName} ${where};`
    return this
  }

  // 查询
  select(where = '') {
    this.sql += `SELECT ${this.getColumn(this.tableKeyList)} FROM ${this.tableName} ${where};`
    return this
  }

  // 统计
  count(where = '', ID?: string) {
    this.sql += `SELECT count(${ID || 'id'}) as count FROM ${this.tableName} ${where};`
    return this
  }

  // --------------------特点CRUD功能

  // 新增一条记录
  crudInsert(ID?: string) {
    return this.omitKey((ID || 'id') as keyof T, this.tableKeyList.length === 0 ? this.tableKeyListBak : this.tableKeyList).insert()
  }

  // 查询所有
  crudSelectAll() {
    return this.select()
  }

  // 根据ID查询
  curdSelectById(ID?: string) {
    return this.select(`where ${ID || 'id'} = ?`)
  }

  // 根据ID更新
  curdUpdateById(ID?: string) {
    return this.omitKey((ID || 'id') as keyof T, this.tableKeyList.length === 0 ? this.tableKeyListBak : this.tableKeyList).update(`where ${ID || 'id'} = ?`)
  }

  // 根据ID删除
  curdDeleteById(ID?: string) {
    return this.delete(`where ${ID || 'id'} = ?`)
  }

  // 查询分页
  curdSelectByPage(where = '') {
    return this.select(`${where} limit ?,?`)
  }

  // --------------------特殊函数

  // 获取最终sql
  getSql() {
    const sql = this.sql
    this.sql = ''
    this.tableKeyList = [...this.tableKeyListBak]
    return sql
  }

  // 设置自定义sql
  setSql(sql: string) {
    this.clearKey()
    this.sql = `${sql};`
    return this
  }

  // 根据对象键值排序返回对应值格式 { b: 2, a: 1 } -> { a: 1, b: 2 } -> [1, 2]
  getValues(targetValue: object) {
    const keys = Object.keys(targetValue).sort()
    return keys.map((key) => targetValue[key])
  }

  // --------------------私有函数

  // SELECT key,key... FROM
  private getColumn(list: Array<keyof T> = []): string {
    return list.length > 0 ? [...new Set(list.sort())].join(',') : '*'
  }

  // 获取并拼接 格式: key=?,key=?...
  private getColumnMerge(list: Array<keyof T> = []): string {
    return list.length > 0 ? `${list.sort().join('=?,')}=?` : ''
  }

  // 获取相应数量拼接 格式: ?,?,?...
  private getColumnJoin(list: Array<keyof T> = []): string {
    return list.length > 0 ? Array(list.length).fill('?').join(',') : ''
  }
}
