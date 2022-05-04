import type { entity_DTYPE } from '#/entity'

import { schemaReduce } from '@/common/schemaReduce'

// sql组合
class composeTable<T extends entity_DTYPE> {
  // 表名
  public table: string
  // 生产sql集合字段
  public list: Array<keyof T>
  // 原有sql集合字段
  public bakList: Array<keyof T>
  // sql语句
  private sql: string
  // schema
  public schema!: schemaReduce<T>

  constructor(tableName: string, keyList: Array<keyof T> = [], entity: T, omitKey?: keyof T | Array<keyof T>) {
    this.table = tableName
    this.list = keyList
    this.bakList = keyList
    this.sql = ''
    this.schema = new schemaReduce(entity, keyList)

    // 初始化并筛选
    if (omitKey) this.list = this.omitKey(omitKey).list
  }

  // 选中key
  pickKey(key: keyof T | Array<keyof T>) {
    if (!key) return this
    if (typeof key === 'string') {
      this.list = this.bakList.filter((f) => key === f)
    } else {
      this.list = this.bakList.filter((f) => (key as Array<keyof T>).includes(f))
    }
    return this
  }

  // 排除key
  omitKey(key: keyof T | Array<keyof T>) {
    if (!key) return this
    if (typeof key === 'string') {
      this.list = this.bakList.filter((f) => f !== key)
    } else {
      this.list = this.bakList.filter((f) => !(key as Array<keyof T>).includes(f))
    }
    return this
  }

  // 追加key
  appendKey(key: keyof T | Array<keyof T>) {
    if (typeof key === 'string') {
      this.list.push(key)
    } else {
      this.list.push(...(key as Array<keyof T>))
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
  deleted(where: string = '') {
    this.sql += `DELETE FROM ${this.table} ${where};`
    return this
  }

  // 查询
  select(where: string = '') {
    this.sql += `SELECT ${this.getColum(this.list)} FROM ${this.table} ${where};`
    return this
  }

  // 统计
  count(where: string = '', ID?: string) {
    this.sql += `SELECT count(${ID || 'id'}) as count FROM ${this.table} ${where};`
    return this
  }

  // --------------------特点CRUD功能

  // 新增一条记录
  crud_insert(ID?: string) {
    return this.omitKey(ID || 'id').insert()
  }

  // 查询所有
  crud_selectAll() {
    return this.select()
  }

  // 根据ID查询
  curd_selectById(ID?: string) {
    return this.select(`where ${ID || 'id'} = ?`)
  }

  // 根据ID更新
  curd_updateById(ID?: string) {
    return this.omitKey(ID || 'id').update(`where ${ID || 'id'} = ?`)
  }

  // 根据ID删除
  curd_deleteById(ID?: string) {
    return this.deleted(`where ${ID || 'id'} = ?`)
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

export default composeTable
