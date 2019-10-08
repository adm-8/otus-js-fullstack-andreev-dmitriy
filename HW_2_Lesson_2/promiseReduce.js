var fn1 = () => {
console.log('fn1')
return Promise.resolve(1)
}

var fn2 = () => new Promise(resolve => {
console.log('fn2')
setTimeout(() => resolve(2), 1000)
})

function promiseReduce(asyncFunctions, reduce, initialValue) {

	memo = initialValue;
	
	asyncFunctions.forEach( (f) => {
		if( typeof f === 'function' ){
			memo = f().then(reduce(memo, initialValue)); 
		}
	})

	return Promise.resolve(memo) 


}

promiseReduce(
	[fn1, fn2],
	function (memo, value) {
		console.log('reduce')
		return memo * value
	},
	1
)
.then(console.log)