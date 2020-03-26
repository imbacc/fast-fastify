//虚拟 抽象实体类
class bean {
	
	constructor(args) {
	    this['colum'] = args
	    args.forEach((col)=> this[col])
	}
	
	// set(key,value){
	// 	this[key] = value
	// }
	
	// get(key){
	// 	return this[key]
	// }
	
	//获取实体类字段 默认删除法则 [删除:删除原有实体类字段] [保留:匹配字段与实体类字段相符]
	get_colum(list = [],type = 'del'){
		let colum = this.colum
		let copy = Object.assign([],colum)
		list = [...new Set(list)]
		if(type === 'del'){
			//删除法
			if(list.length > 0){
				list.filter((min,idx) => {
					if(colum.includes(min)){
						copy.splice(idx,1)
					}
				})
			}
			list = copy
		}else{
			//保留法
			list = list.filter(min => {
				if(colum.includes(min)) return true
			})
		}
		
		let join = list.join(',')
		return list.length > 1 ? join.substring(0,join.length) : join
	}
	
	//获取并拼接 格式: key=?,key=?   ...
	get_value(args){
		let value = ''
		if(args){
			Object.keys(args).forEach((key)=> value += key + '= ?, ')
			value = value.substring(0,value.length-1)
		}
		
		return value
	}

	//获取相应数量拼接 格式: ?,?,?   ...
	get_join(args){
		let value = ''
		if(args.length > 0){
			args.forEach((info)=> value += '?,')
			value = value.substring(0,value.length-1)
		}
		
		return value
	}
}

module.exports = bean
