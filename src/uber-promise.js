class AsyncCallbackEngine {
  constructor(limit) {
    this.concurrentLimit = limit;
    this.runningCount = 0;
    this.queue = [];
  }

  add(task) {
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
      this.schedule();
    });
  }

  schedule() {
    while (this.runningCount < this.concurrentLimit && this.queue.length > 0) {
      const { task, resolve, reject } = this.queue.shift();
      this.execute(task, resolve, reject);
    }
  }

  async execute(task, resolve, reject) {
    this.runningCount++;
    try {
      const result = await task();
      resolve(result);
    } catch (err) {
      reject(err);
    } finally {
      this.runningCount--;
      this.schedule();
    }
  }
}

const engine = new AsyncCallbackEngine(2);

engine.add(async () => {
  console.log("Task 1 start");
  await new Promise((res) => setTimeout(res, 1000));
  console.log("Task 1 end");
});

engine.add(async () => {
  console.log("Task 2 start");
  await new Promise((res) => setTimeout(res, 500));
  console.log("Task 2 end");
});

engine.add(async () => {
  console.log("Task 4 start");
  await new Promise((res) => setTimeout(res, 500));
  console.log("Task 4 end");
});

engine.add(async () => {
  console.log("Task 3 start");
  await new Promise((res) => setTimeout(res, 300));
  console.log("Task 3 end");
});

class AsyncCallback {
  constructor(limit) {
    this.concurrentLimit = limit;
    this.queue = [];
    this.runningCount = 0;
  }

  add(task) {
    return new Promise((r, rej) => {
      this.queue.push({ task, r, rej });
      this.schedule();
    });
  }

  schedule() {
    while (this.runningCount < this.concurrentLimit && this.queue.length > 0) {
      const { task, r, rej } = this.queue.shift();
      this.execute({ task, r, rej });
    }
  }

  async execute({ task, r, rej }) {
    this.runningCount++;
    try {
      const result = await task();
      r(result);
    } catch (e) {
      rej("some error");
    } finally {
      this.runningCount--;
      this.schedule();
    }
  }
}
