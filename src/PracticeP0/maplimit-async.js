function runBatch(batch, fn) {
  return new Promise((resolve, rejct) => {
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

async function mapAsync(array, limit, fn) {
  const choppedArray = [];
  for (let i = 0; i < array.length; i += limit) {
    choppedArray.push(array.slice(i, i + limit));
  }

  const final = [];
  for (batch of choppedArray) {
    const data = await runBatch(batch, fn);
    final.push(...data);
  }

  return final;
}

let numPromise = mapAsync([1, 2, 3, 4, 5], 3, function (num, callback) {
  setTimeout(function () {
    num = num * 2;
    console.log(num);
    callback(null, num);
  }, 2000);
});

numPromise
  .then((result) => console.log("success:" + result))
  .catch(() => console.log("no success"));
