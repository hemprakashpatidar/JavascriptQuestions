// User gets no immediate feedback.
// UX laggy

function simpleDebounce(fn, delay) {
  let timerId;

  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(this, args), delay);
  };
}

// run first call immediately but subsequent call run after a delay
// Last action might not run

function simpleDebounce(fn, delay, immediate = false) {
  let timerId;

  return function (...args) {
    clearTimeout(timerId);
    const callNow = immediate && !timerId;

    timerId = setTimeout(() => {
      timerId = null;
      if (!immediate) fn.apply(this, args);
    }, delay);

    if (callNow) fn.apply(this, args);
  };
}

// debounce trailing

function debounceTrailing(fn, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// producstion ready debounceLeadingTrailing with leading and trailing support

function debounceLeadingTrailing(fn, delay) {
  let timer;
  let lastArgs;

  return function (...args) {
    const callNow = !timer;
    lastArgs = args;

    clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, lastArgs); // trailing
      timer = null;
    }, delay);

    if (callNow) fn.apply(this, lastArgs); // leading
  };
}
