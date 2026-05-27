function PromisesInSeries(promises) {
  const promise = promises.shift();

  promise.then((data) => {
    console.log(data);
    if (promises.length > 0) {
      PromisesInSeries(promises);
    }
  });
}

function promisesInSeriesUsingReducer(promises) {
  promises.reduce((acc, curr) => {
    // resolve prev promise first
    return acc.then(() => curr);
  }, Promise.resolve());
}

const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

promisesInSeriesUsingReducer([p1, p2, p3]);

// It means:

// “Only attach curr.then() after the previous promise chain finishes.”

// So execution becomes:

// acc resolved
//    ↓
// attach curr.then
//    ↓
// curr resolves
//    ↓
// next acc.then
// without acc.then, it becomes parallel execution
// all promises runs in parallel
