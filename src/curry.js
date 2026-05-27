function sum(...initialArgs) {
  let storage = [...initialArgs];

  function collector(...nextArgs) {
    // final call: ()
    if (nextArgs.length === 0) {
      if (storage.length === 0) return 0;
      return storage.slice(0, 4).reduce((a, b) => a + b, 0);
    }

    storage.push(...nextArgs);

    // if already 4 or more, wait for empty call
    if (storage.length >= 4) {
      return collector;
    }

    return collector;
  }

  // if sum() called with no args
  if (storage.length === 0) {
    return () => 0;
  }

  // if already 4 args, still require ()
  if (storage.length >= 4) {
    return collector;
  }

  return collector;
}

const res = sum(1, 2, 3, 4)();
const res2 = sum(1)(2)(3)(4)();
const res3 = sum(1, 2)(3, 4)();
const res4 = sum(1, 2, 3)(4)();
const res5 = sum(1)(2, 3, 4)();
const res6 = sum();

console.log(res, res2, res3, res4, res5, res6);
