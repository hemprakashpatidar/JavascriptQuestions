const Move = function () {
  this.handlers = [];

  this.subscribe = function (fn) {
    this.handlers.push(fn);
  };

  this.unsubscribe = function (fn) {
    this.handlers.filter((handleFn) => handleFn !== fn);
  };

  this.fire = function (o, thisObj) {
    const scope = thisObj || window;
    this.handlers.forEach((item) => item.call(scope, o));
  };
};
