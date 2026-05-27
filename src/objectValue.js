const obj = {
  a: {
    b: {
      c: [1, 2, 3],
    },
  },
};

//   console.log(get(obj, 'a.b.c'));
//   console.log(get(obj, 'a.b.c.0'));
//   console.log(get(obj, 'a.b.c[1]'));
//   console.log(get(obj, 'a.b.c[3]'));

function get(obj, path) {
  if (path === "" && path.length == 0) return null;

  if (Array.isArray(path)) {
    path = path.join(".");
  }

  let exactPath = [];

  for (let i = 0; i < path.length; i++) {
    if (path[i] !== "[" && path[i] !== "]" && path[i] !== ".") {
      exactPath.push(path[i]);
    }
  }

  const value = exactPath.reduce((acc, curr) => {
    if (acc[curr]) {
      acc = acc[curr];
    }

    return acc;
  }, obj);

  return value;
}
