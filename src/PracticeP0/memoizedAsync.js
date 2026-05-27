function memoizeAsyncCallback(fn) {
  const cache = new Map();

  return function (...args) {
    const cb = args.pop();
    const key = JSON.stringify(args);

    if (cache.has(key) && cache.get(key).status === "resolved") {
      cb(null, cache.get(key).value);
      return;
    }

    if (cache.has(key) && cache.get(key).status === "pending") {
      cache.get(key).callbacks.push(cb);
      return;
    }

    cache.set(key, {
      status: "pending",
      callbacks: [cb],
      value: undefined,
    });

    fn(...args, (err, result) => {
      const entry = cache.get(key);

      // If somehow entry is missing, just callback safely
      if (!entry) {
        cb(err, result);
        return;
      }

      // On error: clear cache so next call can retry
      if (err) {
        cache.delete(key);
        entry.callbacks.forEach((cb) => cb(err));
        return;
      }

      // On success: store resolved value and notify all callbacks
      entry.status = "resolved";
      entry.value = result;

      entry.callbacks.forEach((cb) => cb(null, result));
      entry.callbacks = [];
    });
  };
}

function fakeSearchCb(query, cb) {
  console.log(`started: ${query}`);

  setTimeout(() => {
    console.log(`completed: ${query}`);
    cb(null, `result for "${query}"`);
  }, 2000);
}

const searchMemo = memoizeAsyncCallback(fakeSearchCb);

searchMemo("react", console.log);
searchMemo("react", console.log);
searchMemo("react", console.log);
