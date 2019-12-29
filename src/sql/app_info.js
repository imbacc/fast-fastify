var table = 'app_info'
const obj = new app_info()

module.exports = {
	//新增
	insert:()=>{
		const del = ['id']
		return `select ${obj.get_colum(del)} from ${table}`
	}
}