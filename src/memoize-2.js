function memoize(func) {
  let cachedKey, cachedValue;

  function generateKey(args) {
    return args.map((arg) => {
      if (arg === null) {
        return "null";
      }

      if (typeof arg !== "object") {
        return String(arg);
      }

      if (Array.isArray(arg)) {
        return `[${arg.join(",")}]`;
      }

      const sortedKeys = Object.keys(arg).sort();
      const keyValuePairs = sortedKeys.map(
        (key) => `${key}:${generateKey([arg[key]])}`
      );

      return `{${keyValuePairs.join(",")}}`;
    });
  }

  function _memoize(...args) {
    const key = generateKey(args).join("|");
    if (cachedKey === key) {
      return cachedValue;
    }

    cachedKey = key;
    cachedValue = func.apply(this, args);
    return cachedValue;
  }

  _memoize.clear = function () {
    cachedKey = null;
    cachedValue = null;
  };

  return _memoize;
}

function square(x) {
  console.log(`computing ${x} * ${x}`);
  return x * x;
}

const memoizedSquare = memoize(square);

memoizedSquare(1);
memoizedSquare(1);
memoizedSquare(2);
memoizedSquare(3);
memoizedSquare(3);
memoizedSquare(3); // from computation
memoizedSquare(3); // from cache
memoizedSquare.clear();
memoizedSquare(3); // from computation
memoizedSquare(3); // from computation
