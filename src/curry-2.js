function add(...x) {
  // store the current arguments
  let sum = x;

  function resultFn(...y) {
    // merge the new arguments
    sum = [...sum, ...y];
    return resultFn;
  }

  // override the valueOf to return sum
  resultFn.valueOf = function () {
    return sum.reduce((a, b) => a + b, 0);
  };

  // extend the valueOf
  resultFn.value = resultFn.valueOf;

  // return the inner function
  // on any primitive action .valueOf will be invoked
  // and it will return the value
  return resultFn;
}

add(1)(2).value();
add(1, 2)(3).value();
add(1)(2)(3).value();
add(1)(2) + 3;
