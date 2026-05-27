const SDK = function () {
  this.queue = [];
  this.count = 0;

  this.logEvent = function (message) {
    this.queue.push(message);
  };

  wait = function () {
    return new Promise((resolve, reject) => {
      if (this.count % 5 === 0) {
        reject("soemthing went wrong");
      } else {
        resolve(true);
      }
    });
  };

  sendEvent = async function () {
    if (this.queue.length === 0) {
      return;
    }

    const event = this.queue.shift();
    this.count = this.count + 1;

    try {
      await wait();
    } catch (e) {
      this.queue.unshift(event);
      this.count = 1;
    } finally {
      this.sendEvent();
    }
  };

  this.send = function () {
    sendEvent();
  };
};
