const CircuitBreaker = (fn, failureCount, timeThreshold) => {
  let failures = 0;
  let timeSinceLastFailure = 0;
  let isClosed = false;

  return function (...args) {
    if (isClosed) {
      const diff = Date.now() - timeSinceLastFailure;

      // if the time since last failure has exceeded
      // the time threshold
      // open the service
      if (diff > timeThreshold) {
        isClosed = false;
      }
      // else throw error
      else {
        console.error("Service unavailable");
        return;
      }
    }

    try {
      const result = fn(...args);
      failures = 0;
      return result;
    } catch (error) {
      // if function throws error / fails
      // increase the failure count and
      // timewhen it fails
      failures++;
      timeSinceLastFailure = Date.now();
      if (failures >= failureCount) {
        isClosed = true;
      }

      console.log("Error");
    }
  };
};

function testFn() {
  let count = 0;
  return function () {
    count++;
    if (count < 3) throw "error";
    else return "hello";
  };
}

let t = testFunction();

const c = CircuitBreaker(t, 3, 200);

console.log(c());
console.log(c());
console.log(c());
console.log(c());
console.log(c());
console.log(c());
console.log(c());
console.log(c());
console.log(c());
console.log(c());
console.log(c());
console.log(c());

setTimeout(() => {
  console.log(c());
}, 300);
