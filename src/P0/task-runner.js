class TaskQueue {
  constructor({ concurrency = 2 } = {}) {
    if (!Number.isInteger(concurrency) || concurrency <= 0) {
      throw new Error("concurrency must be a positive integer");
    }

    this.concurrency = concurrency;
    this.queue = [];
    this.running = 0;
    this.paused = false;

    this.idleResolvers = [];
  }

  add(task) {
    if (typeof task !== "function") {
      throw new Error("Task must be a function returning a Promise");
    }

    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
      this._drain();
    });
  }

  pause() {
    this.paused = true;
  }

  resume() {
    if (!this.paused) return;
    this.paused = false;
    this._drain();
  }

  clear() {
    // Reject queued tasks (running tasks will continue)
    while (this.queue.length > 0) {
      const item = this.queue.shift();
      item.reject(new Error("Task cancelled: queue cleared"));
    }
    this._checkIdle();
  }

  size() {
    return this.queue.length;
  }

  activeCount() {
    return this.running;
  }

  onIdle() {
    // resolves when queue is empty and no tasks running
    if (this.queue.length === 0 && this.running === 0) {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      this.idleResolvers.push(resolve);
    });
  }

  _drain() {
    // Start as many tasks as possible within concurrency limit
    while (
      !this.paused &&
      this.running < this.concurrency &&
      this.queue.length > 0
    ) {
      const item = this.queue.shift();
      this._runItem(item);
    }

    this._checkIdle();
  }

  async _runItem(item) {
    this.running++;

    try {
      const result = await item.task();
      item.resolve(result);
    } catch (err) {
      item.reject(err);
    } finally {
      this.running--;
      this._drain(); // pick next tasks automatically
    }
  }

  _checkIdle() {
    if (this.queue.length === 0 && this.running === 0) {
      const resolvers = this.idleResolvers;
      this.idleResolvers = [];
      resolvers.forEach((r) => r());
    }
  }
}

const q = new TaskQueue({ concurrency: 3 });

for (let i = 1; i <= 10; i++) {
  q.add(async () => {
    await new Promise((r) => setTimeout(r, 500));
    console.log("done", i);
    return i * 2;
  });
}

setTimeout(() => {
  q.add(async () => {
    console.log("late task started");
    return 999;
  });
}, 700);

await q.onIdle();
console.log("All tasks finished");
