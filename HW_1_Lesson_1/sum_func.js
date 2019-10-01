function sum(a) {

  let currentSum = a;
  let calc = true;

  function f(b) {
  	if(b && calc){
    	currentSum += b;
    }else{
    	calc = false;
    }
	 return f;
  }


  f.toString = function() {
    return currentSum ? currentSum : 0;
  };

  return f;
}

console.log(sum(1));
console.log(sum(1)(2));
console.log(sum(1)(2)());
console.log(sum(1)(2)()(7));
console.log(sum());