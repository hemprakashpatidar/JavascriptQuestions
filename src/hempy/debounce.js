
const debounce = (fn, delay, leading = true, trailing = true) => {
    let timer;
  
    return function (...args) {
      const shouldCallNow = leading && !timer;
  
      clearTimeout(timer);
  
      timer = setTimeout(() => {
        if (trailing && !shouldCallNow) {
            fn.apply(this, args);
        }
        timer = null;
      }, delay);
  
      if (shouldCallNow) {
        fn.apply(this, args);
      }
    };
  };

    const debouncedFn = debounce((arg) => {
        console.log("debounced", arg);
}, 1000);
debouncedFn("test");

debouncedFn("test2");
debouncedFn("test3");



// Check for .flush() .cancel()


const newDebounce =(fn, delay) => {
  let timer;
  let lastThis;
  let lastArgs;

  function debounced(...args) {
    lastArgs=args
    lastThis=this
    clearTimeout(timer)
   
      timer = setTimeout(()=> {
        fn.apply(lastThis, lastArgs)
        timer=null
        lastArgs=null
        lastThis=null
      }, delay)
    }
    debounced.cancel= () => {
      clearTimeout(timer)
      timer=null
      lastArgs=null
      lastThis=null
    }
    debounced.flush = () => {
      if(!timer) return
      fn.apply(lastThis, lastArgs)
      clearTimeout(timer)
      timer=null
      lastArgs=null
      lastThis=null
    }
    return debounced
}






