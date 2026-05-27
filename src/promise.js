const STATE = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
};

class MyPromise {
  #state = STATE.PENDING;
  #value;

  #thenCbs = [];
  #catchCbs = [];

  constructor(cb) {
    try {
      cb(
        (value) => this.#onSuccess(value),
        (error) => this.#onFailed(error)
      );
    } catch (e) {
      this.#onFailed(e);
    }
  }

  #runCallbacks() {
    if (this.#state === STATE.FULFILLED) {
      this.#thenCbs.forEach((cb) => cb(this.#value));
      this.#thenCbs = [];
    }

    if (this.#state === STATE.REJECTED) {
      this.#catchCbs.forEach((cb) => cb(this.#value));
      this.#catchCbs = [];
    }
  }

  #onSuccess(value) {
    if (this.#state !== STATE.PENDING) return;
    this.#state = STATE.FULFILLED;
    this.#value = value;
    this.#runCallbacks();
  }

  #onFailed(value) {
    if (this.#state !== STATE.PENDING) return;
    this.#state = STATE.REJECTED;
    this.#value = value;
    this.#runCallbacks();
  }

  then(thenCb, rejectCb) {
    return new MyPromise((resolve, reject) => {
      if (typeof thenCb === "function") {
        this.#thenCbs.push((value) => {
          try {
            resolve(thenCb(value));
          } catch (e) {
            reject(e);
          }
        });
      }

      if (typeof rejectCb === "function") {
        this.#catchCbs.push((value) => {
          try {
            resolve(rejectCb(value));
          } catch (e) {
            reject(e);
          }
        });
      }

      this.#runCallbacks();
    });
  }

  catch(cb) {
    return this.then(undefined, cb);
  }
}

new MyPromise((resolve) => {
  resolve(10);
})
  .then((v) => v * 2)
  .then((v) => v + 5)
  .then((v) => {
    console.log(v);
  });
