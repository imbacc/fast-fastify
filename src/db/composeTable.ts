import type { entity_DTYPE } from '@/types/db/entity'

// import { SchemaReduce } from '@/db/schemaReduce'

// sql组合
class ComposeTable<T extends entity_DTYPE> {
  // 表名
  private tableName: string
  // 生产sql集合字段
  private sqlKeyList: Array<keyof T>
  // 原有sql集合字段
  private sqlKeyBakList: Array<keyof T>
  // sql语句
  private sql: string
  // schema
  // public schema!: SchemaReduce<T>

  constructor(tableName: string, keyList: Array<keyof T> = [], entity: T, omitKey?: keyof T | Array<keyof T>) {
    this.tableName = tableName
    this.sqlKeyList = keyList
    this.sqlKeyBakList = keyList
    this.sql = ''
    // this.schema = new SchemaReduce(entity, keyList)

    // 初始化并筛选
    if (omitKey) this.sqlKeyList = this.omitKey(omitKey).sqlKeyList
  }

  // 获取表名
  getTableName() {
    return this.tableName
  }

  // 选中key
  pickKey(key: keyof T | Array<keyof T>, keyList?: Array<keyof T>) {
    if (!key) return this
    if (!keyList) keyList = this.sqlKeyBakList
    if (typeof key === 'string') {
      this.sqlKeyList = keyList.filter((f) => key === f)
    } else {
      this.sqlKeyList = keyList.filter((f) => (key as Array<keyof T>).includes(f))
    }
    return this
  }

  // 排除key
  omitKey(key: keyof T | Array<keyof T>, keyList?: Array<keyof T>) {
    if (!key) return this
    if (!keyList) keyList = this.sqlKeyBakList
    if (typeof key === 'string') {
      this.sqlKeyList = keyList.filter((f) => f !== key)
    } else {
      this.sqlKeyList = keyList.filter((f) => !(key as Array<keyof T>).includes(f))
    }
    return this
  }

  // 追加key
  appendKey(key: keyof T | Array<keyof T>) {
    if (typeof key === 'string') {
      this.sqlKeyList.push(key)
    } else {
      this.sqlKeyList.push(...(key as Array<keyof T>))
    }
    return this
  }

  // 清除key 跟append_key配合
  clearKey() {
    this.sqlKeyList = []
    return this
  }

  // ------------------基础功能

  // 新增
  insert() {
    this.sql += `INSERT INTO ${this.tableName} (${this.getColum(this.sqlKeyList)}) VALUES (${this.getJoin(this.sqlKeyList)});`
    return this
  }

  // 更新
  update(where = '') {
    this.sql += `UPDATE ${this.tableName} SET ${this.getValue(this.sqlKeyList)} ${where};`
    return this
  }

  // 删除
  deleted(where = '') {
    this.sql += `DELETE FROM ${this.tableName} ${where};`
    return this
  }

  // 查询
  select(where = '') {
    this.sql += `SELECT ${this.getColum(this.sqlKeyList)} FROM ${this.tableName} ${where};`
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
    return this.omitKey(ID || 'id', this.sqlKeyList.length === 0 ? this.sqlKeyBakList : this.sqlKeyList).insert()
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
    return this.omitKey(ID || 'id', this.sqlKeyList.length === 0 ? this.sqlKeyBakList : this.sqlKeyList).update(`where ${ID || 'id'} = ?`)
  }

  // 根据ID删除
  curdDeleteById(ID?: string) {
    return this.deleted(`where ${ID || 'id'} = ?`)
  }

  // 查询分页
  curdSelectByPage(where = '') {
    return this.select(`${where} limit ?,?`)
  }

  // 获取最终sql
  getSql() {
    const sql = this.sql
    this.sql = ''
    this.sqlKeyList = [...this.sqlKeyBakList]
    return sql
  }

  // 设置自定义sql
  setSql(sql: string) {
    this.clearKey()
    this.sql = `${sql};`
    return this
  }

  // SELECT key,key... FROM
  private getColum(list: Array<keyof T> = []): string {
    return list.length > 0 ? [...new Set(list)].join(',') : '*'
  }

  // 获取并拼接 格式: key=?,key=?...
  private getValue(list: Array<keyof T> = []): string {
    return list.length > 0 ? `${list.join('=?,')}=?` : ''
  }

  // 获取相应数量拼接 格式: ?,?,?...
  private getJoin(list: Array<keyof T> = []): string {
    return list.length > 0 ? Array(list.length).fill('?').join(',') : ''
  }
}

export default ComposeTable
