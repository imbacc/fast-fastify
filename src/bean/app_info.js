class app_info {

	const colum = [
		'id',
		'text',
		'version',
		'os',
		'ostext',
		'linkurl',
		'token'
	]
	
	constructor(){
		colum.forEach((col)=> this[col])
	}

	set(key,value){
		this[key] = value
	}
	
	get(key){
		return this[key]
	}
	
	get_colum(list = [],type = 'del'){
		const copy = new Map(colum)
		list = [...new Set(list)]
		if(type === 'del'){
			//删除法
			list.filter(min => {
				if(b.includes(min)){
					copy.delete(min)
				}
			})
			list = [...copy]
		}else{
			//保留法
			list = list.filter(min => b.includes(min))
		}
		return list.join(',')
	}

}
