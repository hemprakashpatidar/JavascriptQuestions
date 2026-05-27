const makeApiCall = async (path, config) => {
  const res = await fetch(path, config);

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  return res.json();
};

const generateKey = (path, config) => {
  const stableConfigKey = Object.keys(config)
    .sort()
    .map((k) => `${k}:${String(config[k])}`)
    .join("&");

  return `${path}?${stableConfigKey}`;
};

function cachedApiCall(ttlMs) {
  // cache[key] can be:
  // { value, expiryTime }
  // { promise, expiryTime }
  const cache = {};

  return async function (path, config = {}) {
    const key = generateKey(path, config);
    const entry = cache[key];

    // 1) If in-flight, reuse same promise
    if (entry && entry.promise) {
      return entry.promise;
    }

    // 2) If cached value exists and not expired, return it
    if (entry && entry.value !== undefined && Date.now() <= entry.expiryTime) {
      return entry.value;
    }

    // 3) Else create a new request promise
    console.log("making new api call:", key);

    const promise = makeApiCall(path, config)
      .then((value) => {
        cache[key] = {
          value,
          expiryTime: Date.now() + ttlMs,
        };
        return value;
      })
      .catch((e) => {
        delete cache[key];
        throw e;
      });

    // store promise immediately so other calls dedupe
    cache[key] = {
      promise,
      expiryTime: Date.now() + ttlMs,
    };

    return promise;
  };
}

/** ------------------ DEMO ------------------ **/

const call = cachedApiCall(1500);

call("https://jsonplaceholder.typicode.com/todos/1", {}).then(console.log);

setTimeout(() => {
  call("https://jsonplaceholder.typicode.com/todos/1", {}).then(console.log);
}, 700);

setTimeout(() => {
  call("https://jsonplaceholder.typicode.com/todos/1", {}).then(console.log);
}, 2000);
