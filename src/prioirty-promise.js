const p0 = new Promise((resolve, reject) =>
  setTimeout(() => {
    resolve("P0");
  }, 400)
);

const p1 = new Promise((resolve, reject) =>
  setTimeout(() => {
    resolve("P1");
  }, 100)
);

const p2 = new Promise((resolve, reject) =>
  setTimeout(() => {
    resolve("P2");
  }, 300)
);

async function priorityPromise(promises) {
  return new Promise((resolve, reject) => {
    let rejectedCount = 0;
    let settled = false;
    let states = promise.map(() => ({
      status: "pending",
      value: undefined,
      reason: undefined,
    }));

    function checkPromisesThatAreFulfilled() {
      if (settled) return;

      for (let i = 0; i < states.length; i++) {
        const s = states[i];

        // Can't use this index yet
        if (s.status === "pending") return;

        // Higher-priority rejected → check next
        if (s.status === "rejected") continue;

        // First fulfilled with all higher-priority rejected
        settled = true;
        resolve(s.value);
        return;
      }

      if (rejectedCount === promises.length) {
        settled = true;
        reject("aggregate rejected error: something wrong");
      }
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((data) => {
          states[index] = {
            ...statuses[index],
            status: "fulfilled",
            value: data,
          };
          checkPromisesThatAreFulfilled();
        })
        .catch((error) => {
          states[index] = {
            ...statuses[index],
            status: "rejected",
            reason: error,
          };
          rejectedCount++;
          checkPromisesThatAreFulfilled();
        });
    });
  });
}

priorityPromise([p0, p1, p2])
  .then((data) => {
    console.log(data);
  })
  .catch((e) => console.log(e));
