let generateSum = (limit) => {
  // helper function
  let helper = (...args) => {
    // if we are receiving the expected number of arguments
    if (args.length >= limit) {
      // slice the arguments to the size of the limit
      // return the sum of them.
      let allowedArgs = args.slice(0, limit);
      return allowedArgs.reduce((a, b) => a + b, 0);
    } else {
      // return a new function that will accept the remaining arguments
      let temp = (...args2) => {
        // recursively call the same function
        // to validate if we have received the required amount
        // of arguments
        return helper(...args, ...args2);
      };

      // return the function
      return temp;
    }
  };

  // return helper
  return helper;
};
