// sql组合
export class composeTable_DTYPE {
  private table: string
  private list: Array<string>
  private bakList: Array<string>
  private sql: string

  constructor(tableName: string, keyList: Array<string>, removeKey: string | Array<string>)

  // 筛选key
  filterKey(removeKey: string | Array<string>): this

  // 追加key
  appendKey(key: string | Array<string>): this

  // 清除key 跟append_key配合
  clearKey(): this

  // ------------------基础功能

  // 新增
  insert(): this

  // 更新
  update(where: string): this

  // 删除
  deleted(where: string): this

  // 查询
  select(where: string): this

  // 统计
  count(where: string): this

  // --------------------特点CRUD功能

  // 新增一条记录
  crud_insert(): this

  // 查询所有
  crud_selectAll(): this

  // 根据ID查询
  curd_selectById(): this

  // 根据ID更新
  curd_updateById(): this

  // 根据ID删除
  curd_deleteById(): this

  // 查询分页
  curd_selectByPage(where: string): this

  // --------------------结果result
  // 获取最终sql
  getSql(): string

  // SELECT key,key... FROM
  private getColum(list: Array<string>): string

  // 获取并拼接 格式: key=?,key=?...
  private getValue(list: Array<string>): string

  // 获取相应数量拼接 格式: ?,?,?...
  private getJoin(list: Array<string>): string
}
