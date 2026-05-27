function wait(interval) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), interval);
  });
}

const retryWithDelay = async function (
  fn,
  retries = 3,
  interval = 50,
  finalErr = "Retry failed"
) {
  try {
    await fn();
  } catch (e) {
    if (retries === 0) {
      return Promise.reject(finalErr);
    }

    await wait(interval);

    return retryWithDelay(fn, retries - 1, interval, finalErr);
  }
};
