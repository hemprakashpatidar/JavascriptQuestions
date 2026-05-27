function flatten(arr, res = []) {
  console.log(res);
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      flatten(arr[i], res);
    } else {
      res.push(arr[i]);
    }
  }
  return res;
}

console.log(flatten([1, 2, 3, 4, [5, 6, [7, 8, 9], [10]], 11]));
