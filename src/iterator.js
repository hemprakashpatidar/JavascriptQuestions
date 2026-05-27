function helper(arr) {
  let count = 0;

  return {
    next: function () {
      return count < arr.length ? arr[this.count++] : null;
    },
    done: function () {
      return this.count >= arr.length;
    },
  };
}

let iterator = helper([1, 2, "hello"]);
console.log(iterator.next()); // 1
console.log(iterator.next()); // 2
console.log(iterator.done()); // false
console.log(iterator.next()); // "hello"
console.log(iterator.done()); // true
console.log(iterator.next()); // "null"
