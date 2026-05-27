function throttle(task, count = task.length, callback, delay = 2000) {
  let lastRan;
  let queue = [];
  let timeoutId;

  if (!lastRan) {
    queue = [...queue, ...task];

    const executreTask = queue.splice(0, count);
    callback(executreTask);
    lastRan = Date.now();
  } else {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(function () {
      // calc the difference between
      // the last ran and current time
      // if it is greater than the delay
      // invoke it
      if (Date.now() - lastRan >= delay) {
        // copy all the tasks to the queue
        queue = [...queue, ...task];

        // get the amount of task to run
        const execute = queue.splice(0, count);

        // pass those tasks to the callback
        callback(execute);

        // update the last ran time
        // to run it after the delay
        lastRan = Date.now();
      }
    }, delay - (Date.now() - lastRan));
  }
}

btn.addEventListener(
  "click",
  throttle(
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    2,
    (task) => {
      console.log(task);
    },
    2000
  )
);
