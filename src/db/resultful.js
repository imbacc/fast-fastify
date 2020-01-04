//虚拟枚举类型
const APIResultCode = {
	IsNull:[-11,"空值参数"],
	ValError:[-12,"参数错误"],
	ValNoCode:[-13,"参数不规范"],

	RepeatReg:[-101,"手机号重复注册"],
	TestCode_ERROR:[-102,"验证码验证失败"],

	SMS_ERRPR:[-1001,"短信发送失败"],

	API_ERROR:[-10000,"访问失败"],
	API_OutTime:[-10001,"服务器繁忙,请稍后访问"],

	Upload_SUCCESS:[9999, "上传成功"],
	Upload_ERROR:[-9999, "上传失败"],

	WARNING:[0,"没有相应数据"],
	SUCCESS:[1, "请求成功"],
	SUCCESS_NO_FORMAT:[2, "请求成功，需要格式json"],
	ERROR:[-1, "请求失败"],
	WARN:[-2, "网络异常，请稍后重试"],
	
	WHEREIS_CRACK:[-995,"非法访问???"],
	
	UNMAKETOKEN_NULL:[-996,"请携带提司腰牌!"],
	UNMAKETOKEN_HASH:[-997,"这不是提司腰牌!"],
	UNMAKETOKEN_RUBBISH:[-998,"提司腰牌已损坏!"],
	UNMAKETOKEN_ERROR:[-999,"提司腰牌与身份不匹配!"],
}

//虚拟返回格式
class APIResultful{
	constructor(code,msg,data) {
	    this.code = code
		this.msg = msg
		this.data = data || null
	}
	
	result(){
		return {
			code:this.code,
			msg:this.msg,
			data:this.data
		}
	}
}

module.exports = (key,data) => new APIResultful(...APIResultCode[key],data).result()

