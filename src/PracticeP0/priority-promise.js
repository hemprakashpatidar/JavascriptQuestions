const createPromise = (promise) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (promise.status === "resolved") {
        resolve(promise);
      } else {
        reject(promise);
      }
    }, Math.random() * 500);
  });
};

function PriorityPromise(promises) {
  return new Promise((resolve, reject) => {
    let best = null;
    let settled = 0;
    let resolvedCount = 0;

    for (let i = 0; i < promises.length; i++) {
      const actualpromise = createPromise(promises[i]);
      actualpromise
        .then((value) => {
          resolvedCount++;
          if (value.status === "resolved") {
            if (best && best.priority < value.priority) {
              best = value;
            } else {
              best = value;
            }
          }
        })
        .catch()
        .finally((e) => {
          settled++;
          if (settled === promises.length) {
            if (resolvedCount === 0) {
              return reject("common error");
            } else {
              resolve(best);
            }
          }
        });
    }
  });
}

const promises = [
  {
    status: "rejected",
    priority: 1,
  },
  {
    status: "resolved",
    priority: 2,
  },
  {
    status: "rejected",
    priority: 3,
  },
  {
    status: "resolved",
    priority: 4,
  },
];

priorityPromise(promises)
  .then((value) => {
    console.log("value>>>>>", value);
  })
  .catch((error) => {
    console.log("error>>>>>", error);
  });
