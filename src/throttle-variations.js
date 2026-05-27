// Simple Throttle, default throttle is leading

// Executes immediately on the first call.
function simpleThrottle(fn) {
  let last = 0;

  return function (...args) {
    const now = Date.now();
    if (now - last >= delay) {
      fn.apply(this, args);
    }
  };
}

// Ensures last call in burst is executed.

function throttleWithTrailing(fn, delay) {
  let timer = null;

  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        timer = null;
      }, delay);
    }
  };
}

// Runs immediately on first call
// Ensure last call

function throttleLeadingTrailing(fn, delay) {
  let timer = null;
  let lastArgs = null;
  let lastCall = 0;

  return function (...args) {
    const now = Date.now();
    const remaining = delay - (now - lastCall);

    lastArgs = args;

    if (remaining <= 0) {
      // Leading execution
      fn.apply(this, lastArgs);
      lastCall = now;
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    } else if (!timer) {
      // Trailing execution
      timer = setTimeout(() => {
        fn.apply(this, lastArgs);
        lastCall = Date.now();
        timer = null;
      }, remaining);
    }
  };
}
