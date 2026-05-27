const debounce = (fn, delay, option = { leading: true, trailing: true }) => {
  let timeout;
  let isLeadingInvoked = false;

  return function (...args) {
    const context = this;

    //base condition
    if (timeout) {
      clearTimeout(timeout);
    }

    // handle leading
    if (option.leading && !timeout) {
      fn.apply(context, args);
      isLeadingInvoked = true;
    } else {
      isLeadingInvoked = false;
    }

    // handle trailing
    timeout = setTimeout(() => {
      if (option.trailing && !isLeadingInvoked) {
        fn.apply(context, args);
      }

      timeout = null;
    }, delay);
  };
};
