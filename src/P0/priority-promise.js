class AllPromisesFailedError extends Error {
  constructor(message = "All promises failed") {
    super(message);
    this.name = "AllPromisesFailedError";
  }
}

// helper: converts {status} into a real promise
function makePromiseFromStatus(obj) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (obj.status === "resolve") resolve(obj);
      else reject(obj);
    }, Math.random() * 500); // random delay to simulate real async
  });
}

function resolvePromisesWithPriority(list) {
  return new Promise((resolve, reject) => {
    let best = null; // best resolved item (lowest priority number)
    let settled = 0;
    let resolvedCount = 0;

    list.forEach((item) => {
      const p = makePromiseFromStatus(item);

      p.then(() => {
        resolvedCount++;

        if (!best || item.priority < best.priority) {
          best = item;
        }
      })
        .catch(() => {})
        .finally(() => {
          settled++;

          if (settled === list.length) {
            if (resolvedCount === 0) {
              reject(new AllPromisesFailedError());
            } else {
              resolve(best);
            }
          }
        });
    });
  });
}

/** ---------------- DEMO ---------------- **/

const promises = [
  { status: "resolve", priority: 4 },
  { status: "reject", priority: 1 },
  { status: "resolve", priority: 2 },
  { status: "reject", priority: 3 },
];

resolvePromisesWithPriority(promises)
  .then((res) => console.log(res))
  .catch((err) => console.log(err.name, err.message));

// Output:
// { status: 'resolve', priority: 2 }
