function pipe(obj) {
  return function (...args) {
    for (let key in obj) {
      const val = obj[key];
      if (typeof val === "function") {
        obj[key] = val(...args);
      } else {
        obj[key] = pipe(val)(...args);
      }
    }

    return obj;
  };
}

const obj = {
  a: {
    b: (a, b, c) => a + b + c,
    c: (a, b, c) => a + b - c,
  },
  d: (a, b, c) => a - b - c,
};

console.log(pipe(obj)(1, 1, 1));

//   Output:
//   {
//     a : {
//       b : 3,
//       c : 1
//     },
//     d: -1
//   }
