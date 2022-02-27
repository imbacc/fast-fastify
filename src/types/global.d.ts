export declare global {
  // base64加密
  var base64: Function<string>
  // base64解密
  var base64Re: Function<string>
  // api接口键为N时回收内存
  var apiClear: number
  // api接口缓存
  var apiCache: Object<string, any>
  // api限流设置 '路由名字':[每秒,次数]
  var apiLimit: Object<string, Array<number, number>>
  // // 跳过权限检测
  var jumpAuth: Map<string, any>
  // 添加跳过权限函数
  var addJump: Function<Array<string>>
  // 获取缓存
  var getCache: Function<Promise<string>>
  // 设置缓存
  var setCache: Function<Array<string, any>>
}
