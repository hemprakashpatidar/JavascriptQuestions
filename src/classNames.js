function processClassName(cn, res = "") {
  if (typeof cn === "object") {
    if (cn === null) {
      return "";
    } else if (Array.isArray(cn)) {
      cn.forEach((internalCn) => (res += processClassName(internalCn)));
    } else {
      Object.keys(cn).forEach((key) => {
        if (cn[key]) {
          res += " " + key;
        }
      });
    }
  } else {
    if (!!cn) {
      res += " " + cn;
    }
  }

  return res;
}

function generateClassName(...args) {
  const classNames = args;
  let formattedClassNames = "";

  classNames.forEach((className) => {
    formattedClassNames += processClassName(className);
  });

  return formattedClassNames.trim();
}

console.log(
  JSON.stringify(
    generateClassName("1", { a: true, b: false }, [1, 2, 3], null, undefined)
  )
);

console.log(generateClassName("foo", "bar")); // => 'foo bar'
console.log(generateClassName("foo", { bar: true })); // => 'foo bar'
console.log(generateClassName({ "foo-bar": true })); // => 'foo-bar'
console.log(generateClassName({ "foo-bar": false })); // => ''
console.log(generateClassName({ foo: true }, { bar: true })); // => 'foo bar'
console.log(generateClassName({ foo: true, bar: true })); // => 'foo bar'

// lots of arguments of various types
console.log(
  generateClassName("foo", { bar: true, duck: false }, "baz", { quux: true })
); // => 'foo bar baz quux'

// // other falsy values are just ignored
console.log(
  generateClassName(null, false, "bar", undefined, 0, -1, { baz: null }, "")
); // => 'bar 1'

const arr = ["b", { c: true, d: false }];
console.log(generateClassName("a", arr)); // => 'a b c'

let buttonType = "primary";
console.log(generateClassName({ [`btn-${buttonType}`]: true }));
