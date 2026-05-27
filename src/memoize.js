const memoize = function (fn) {
  const cache = {};

  return function (args) {
    //arg as key to store the result
    const KEY = JSON.stringify(args);

    //if the result is present for the given key return it
    if (cache[KEY]) {
      console.log("returned from cache");
      return cache[KEY];
    }

    //else compute and store the result and return the result
    const evaluatedValue = fn(...args);
    cache[KEY] = evaluatedValue;
    return evaluatedValue;
  };
};

const memoizedFn = memoize((a, b) => a + b);

memoizedFn([1, 2]);
memoizedFn([1, 2]);
