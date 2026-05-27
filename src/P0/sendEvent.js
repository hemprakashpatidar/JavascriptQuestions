function sleep(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

function isRetryAvailable(err) {
  return err.status >= 500 && err.status < 600;
}

class AnalyticsClient {
  constructor({
    batchSize,
    flushInterval,
    retries = 3,
    factor = 2,
    baseDelay = 300,
  }) {
    this.batchSize = batchSize;
    this.flushInterval = flushInterval;
    this.retries = retries;
    this.factor = factor;
    this.baseDelay = baseDelay;

    this.isFlushing = false;
    this.queue = [];
    this.flushTimer = null;
  }

  log(event) {
    this.queue.push({
      ...event,
      _meta: {
        createdAt: Date.now(),
      },
    });

    if (this.queue.length >= this.batchSize) {
      this.flush();
      return;
    }

    this.scheduleEventProcessing();
  }

  scheduleEventProcessing() {
    if (this.isFlushing || this.flushTimer) return;

    this.flushTimer = setTimeout(() => {
      this.flushTimer = null;
      this.flush();
    }, this.flushInterval);
  }

  async flush() {
    if (this.isFlushing) return;
    if (this.queue.length === 0) return;

    // Cancel timer because we are flushing now
    if (this.flushTimer) {
      clearTimeout(this.flushTimer);
      this.flushTimer = null;
    }

    this.isFlushing = true;

    try {
      while (this.queue.length > 0) {
        const batch = this.queue.splice(0, this.batchSize);

        try {
          await this.sendBatchWithRetry(batch);
        } catch (err) {
          console.log("Dropping batch after retries:", batch, err);
        }
      }
    } finally {
      this.isFlushing = false;

      // If new events came while flushing, flush again
      if (this.queue.length > 0) {
        this.flush();
      }
    }
  }

  async sendBatch(batch) {
    await fetch("/anmalytics/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ events: batch }),
    });

    if (!res.ok) {
      const err = new Error("Batch send failed: " + res.status);
      err.status = res.status;
      throw err;
    }

    return true;
  }

  async sendBatchWithRetry(batch) {
    let attempts = 0;
    while (attempts <= this.retries) {
      try {
        await this.sendBatch(batch);
        return;
      } catch (e) {
        if (!isRetryableError(err)) throw err;

        if (attempts === this.retries) throw err;

        const delay = this.baseDelay * Math.pow(this.factor, attempts);
        await sleep(delay);

        attempts++;
      }
    }
  }
}

const analytics = new AnalyticsClient({ batchSize: 5, flushInterval: 500 });

analytics.log({ name: "click", props: { id: 1 } });
analytics.log({ name: "click", props: { id: 2 } });
analytics.log({ name: "click", props: { id: 3 } });

analytics.log({ name: "scroll", props: { id: 6 } });
analytics.log({ name: "scroll", props: { id: 7 } });
analytics.log({ name: "scroll", props: { id: 8 } });
