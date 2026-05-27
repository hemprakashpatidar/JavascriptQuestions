const makeApiCall = async (path, config) => {
  const res = await fetch(path, config);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  return res.json();
};

const generateKey = (path, config) => {
  const stableConfigKey = Object.keys(config)
    .sort()
    .map((key) => {
      return `${key}:${String(config[key])}`;
    })
    .join("&");

  return `${path}?${stableConfigKey}`;
};

async function cacheApiCall(cacheTimeout) {
  const cache = {};

  return async function (path, config) {
    const cacheKey = generateKey(path, config);

    const entry = cache[cacheKey];

    if (entry && entry.promise) {
      return entry.promise;
    } else if (entry !== undefined && entry.expiry > Date.now()) {
      return entry.value;
    } else {
      console.log("makeApiCall>>>>");

      const promise = makeApiCall(path, config)
        .then((value) => {
          cache[key] = {
            expiry: Date.now() + cacheTimeout,
            value,
          };
          return value;
        })
        .catch((e) => {
          delete cache[key];
          throw e;
        });
      cache[key] = {
        promise,
        expiry: Date.now() + cacheTimeout,
      };

      return promise;
    }
  };
}

const call = cacheApiCall(1500);

call("https://jsonplaceholder.typicode.com/todos/1", {})
  .then((value) => {
    console.log("value>>>", value);
  })
  .catch((e) => {
    console.log("error>>>", e);
  });

setTimeout(() => {
  call("https://jsonplaceholder.typicode.com/todos/1", {})
    .then((value) => {
      console.log("value>>>", value);
    })
    .catch((e) => {
      console.log("error>>>", e);
    });
}, 700);

setTimeout(() => {
  call("https://jsonplaceholder.typicode.com/todos/1", {})
    .then((value) => {
      console.log("value>>>", value);
    })
    .catch((e) => {
      console.log("error>>>", e);
    });
}, 2000);
