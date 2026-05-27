const Store = function () {
  this.store = new Map();

  this.add = function (timestamp, price) {
    if (this.store.has(timestamp)) {
      this.store.set(timestamp, [...this.store.get(timestamp), price]);
    } else {
      this.store.set(timestamp, [price]);
    }
  };

  this.highestPrice = function (timestamp) {
    const prices = this.store.get(timestamp) || [];

    return Math.max(...prices) ?? 0;
  };
};
