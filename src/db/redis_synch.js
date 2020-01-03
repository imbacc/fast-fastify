class synch{
	constructor(key,fun) {
	    this.key = key
		this.fun = fun
	}
	
	 synch_fun() {
	    let value = this.fun(this.key).then((res)=>{
			console.log('synch_fun=',res)
		})
	    return value
	}
}

module.exports = (key,fun) => {
	let syn = new synch(key,fun)
	let val = syn.synch_fun()
	val.then((res) => {
		console.log('dres=',res)
	})
	console.log('val=',val)
	return val
}