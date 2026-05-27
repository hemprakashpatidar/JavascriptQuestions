function sampler(callback, limit, context) {
  let counter = 0;
  return function (...args) {
    context = context || this;

    if (++counter === limit) {
      callback.apply(context, args);
      counter = 0;
    }
  };
}

function message() {
  console.log("hello");
}

const sample = sampler(message, 4);
sample();
sample();
sample();
sample(); // this will be executed
sample();
sample();
sample();
sample(); // this will be executed
