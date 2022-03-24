import type { APIResultCode_DTYPE, APIResultful_DTYPE } from '#/resultful'

//虚拟枚举类型 自己定义
export const APIResultCode: APIResultCode_DTYPE = {
  // 0到999 请求成功类
  SUCCESS: [0, '请求成功'],
  SUCCESS_NULL: [1, '没有相应数据'],
  UPLOAD_SUCCESS: [0, '上传成功'],
  SUCCESS_LOGIN_TRUE: [0, '登录成功'],

  // -1到-9 请求失败类
  FAIL: [-1, '请求失败'],
  WARN: [-2, '网络异常，请稍后重试'],

  // -10到-99 参数验证类
  IS_NULL: [-10, '空值参数'],
  VAL_FAIL: [-11, '参数错误'],
  VAL_CODE: [-12, '参数不规范'],

  // -100到-999 验证服务类
  REPEATREG: [-101, '手机号重复注册'],
  TESTCODE_FAIL: [-102, '验证码验证失败'],
  SMS_ERRPR: [-103, '短信发送失败'],
  SUCCESS_LOGIN_FALSE: [-100, '登录失败'],
  REPETA_REGISTER: [-200, '注册重复'],

  // -1000到-9999 请求其他类
  UPLOAD_FAIL: [-9999, '上传失败'],

  // -10000到-99999 服务器类
  API_ERROR: [-10000, '接口错误异常'],
  API_OUTTIME: [-10001, '服务器繁忙,请稍后访问'],
  WHEREIS_CRACK: [-99995, '非法访问???'],
  UNMAKETOKEN_NULL: [-99996, '请携带提司腰牌!'],
  UNMAKETOKEN_HASH: [-99997, '这不是提司腰牌!'],
  UNMAKETOKEN_RUBBISH: [-99998, '提司腰牌已损坏!'],
  UNMAKETOKEN_FAIL: [-99999, '提司腰牌与身份不匹配!']
}

// type code_DTYPE = APIResultCode_DTYPE extends keyof string

//虚拟返回格式
class APIResultfulNode implements APIResultful_DTYPE {
  public code: number = 0
  public msg: string = ''
  public data: any = null

  result(result: APIResultful_DTYPE) {
    this.code = result.code
    this.msg = result.msg
    this.data = result.data || null
    const { code, msg, data } = this
    return { code, msg, data }
  }
}

const APIResultful = new APIResultfulNode()
export default (key: keyof APIResultCode_DTYPE | never, data?: any) => {
  const [code, msg] = APIResultCode[key]
  return APIResultful.result({ code, msg, data })
}
