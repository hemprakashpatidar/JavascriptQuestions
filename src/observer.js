class Publisher {
  constructor() {
    this.subscribers = [];
  }

  subscribe(observerFn) {
    this.subscribers.push(observerFn);
  }

  unSubscribe(observerFn) {
    this.subscribers = this.subscribers.filter(fn !== observerFn);
  }

  notifyData(data) {
    this.subscribers.forEach((fn) => fn(data));
  }
}

const publisher = new Publisher();
publisher.subscribe(obs1);
publisher.notify("I am testing obs1 data");

publisher.subscribe(obs2);
publisher.notify("I am testing obs2 data");

publisher.unSubscribe(obs1);
publisher.notify("I am testing obs2 data after remove obs1");

publisher.unSubscribe(obs2);
publisher.notify("I am testing after remove obs2");

function obs1(msg) {
  console.log("obs1 " + msg);
}

function obs2(msg) {
  console.log("obs2 " + msg);
}
