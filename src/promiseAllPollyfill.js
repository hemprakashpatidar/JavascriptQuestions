function myPromiseAll(promises) {
  const result = [];
  let completed = 0;

  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((data) => {
          // this will preserve the order of promise execution
          result[index] = data;
          completed++;
          if (completed === promises.length) {
            resolve(result);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  });
}
