import type { APIResultful_DTYPE } from '#/common/resultful'

// 虚拟枚举类型 自己定义
export class APICode {
  // 0到999 请求成功区块
  SUCCESS = [0, '请求成功']
  UPLOAD_SUCCESS = [0, '上传成功']
  SUCCESS_LOGIN_TRUE = [0, '登录成功']
  SUCCESS_NULL = [1, '没有相应数据']

  // -1到-9 请求异常区块
  FAIL = [-1, '请求失败']
  WARN = [-2, '网络异常,请稍后重试']
  MYSQL_CONNECT_WARN = [-9, '数据库链接异常,请稍后重试']

  // -10到-99 参数验证区块
  IS_NULL = [-10, '空值参数']
  VAL_FAIL = [-11, '参数错误']
  VAL_CODE = [-12, '参数不规范']

  // -100到-999 验证服务区块
  REPEATREG = [-101, '手机号重复注册']
  TESTCODE_FAIL = [-102, '验证码验证失败']
  SMS_ERRPR = [-103, '短信发送失败']
  SUCCESS_LOGIN_FALSE = [-100, '登录失败']
  REPETA_REGISTER = [-200, '注册重复']

  // -1000到-9999 请求其他区块
  UPLOAD_FAIL = [-9999, '上传失败']

  // -10000到-99999 服务器区块
  API_ERROR = [-10000, '接口错误异常']
  API_OUTTIME = [-10001, '服务器繁忙,请稍后访问']
  WHEREIS_CRACK = [-99995, '非法访问???']
  UNMAKETOKEN_NULL = [-99996, '请携带提司腰牌!']
  UNMAKETOKEN_HASH = [-99997, '这不是提司腰牌!']
  UNMAKETOKEN_RUBBISH = [-99998, '提司腰牌已损坏!']
  UNMAKETOKEN_FAIL = [-99999, '提司腰牌与身份不匹配!']

  // 自定义内容
  NOTHINK_RESULT = []
}

// 虚拟返回格式
class APIResultful {
  public code = 0
  public msg = ''
  public data: any = null

  resultful(result: APIResultful_DTYPE) {
    this.code = result.code
    this.msg = result.msg
    this.data = result.data || null
    return { code: this.code, msg: this.msg, data: this.data }
  }
}

const apiResultful = new APIResultful()
const apiCode = new APICode()

export const resultful = <T = any>(key: keyof APICode, data?: T) => {
  const [code, msg] = apiCode[key] as [number, string]
  return apiResultful.resultful({ code, msg, data })
}
