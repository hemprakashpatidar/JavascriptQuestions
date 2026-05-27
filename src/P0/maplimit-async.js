function runBatch(batch, fn) {
  return new Promise((resolve, reject) => {
    const results = new Array(batch.length);
    let done = 0;

    batch.forEach((item, i) => {
      fn(item, (err, val) => {
        if (err) return reject(err);

        results[i] = val;
        done++;

        if (done === batch.length) resolve(results);
      });
    });
  });
}

async function mapLimit(arr, limit, fn) {
  const chopped = [];
  for (let i = 0; i < arr.length; i += limit) {
    chopped.push(arr.slice(i, i + limit));
  }

  const final = [];

  for (const batch of chopped) {
    const batchResults = await runBatch(batch, fn); // parallel inside batch
    final.push(...batchResults); // keep order
  }

  return final;
}

let numPromise = mapLimit([1, 2, 3, 4, 5], 3, function (num, callback) {
  setTimeout(function () {
    num = num * 2;
    console.log(num);
    callback(null, num);
  }, 2000);
});

numPromise
  .then((result) => console.log("success:" + result))
  .catch(() => console.log("no success"));
