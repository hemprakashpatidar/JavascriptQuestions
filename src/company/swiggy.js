function debounce(fn, delay) {
  let timer;
  const wrapper = function (...args) {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };

  wrapper.cancel = () => clearTimeout(timer);

  return wrapper;
}

function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      Promise.resolve(promise).then(resolve, reject);
    });
  });
}

function promiseAll(promises) {
  let resolvedPromises = [];
  let resolveLeft = promises.length;
  // add this as the first line inside the Promise
  return new Promise((resolve, reject) => {
    if (promises.length === 0) return resolve([]);
    promises.forEach((promise, idx) => {
      Promise.resolve(promise)
        .then((res) => {
          resolvedPromises[idx] = res;
          resolveLeft--;
          if (resolveLeft === 0) resolve(resolvedPromises);
        })
        .catch(reject);
    });
  });
}

function useDebounce(value, delay) {
  // your implementation
  const [debouncedValue, setDebouncedValue] = useState(va₹lue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

function useOrderTracker(orderId, onMessage) {
  // your implementation
  
  useEffect(()=> {
    let socket
    let timer
    function connect(attempt =0) {
      socket = new WebSocket(`wss://api.swiggy.com/orders/${orderId}`)

      socket.onmessage = (event) => {
        onMessage(JSON.parse(event.data))
      }
      socket.onclose = () => {
        const MAX_ATTEMPT = 5
        if(attempt >= MAX_ATTEMPT) {
          return
        }
        const delay = Math.min (  1000 * 2 ** attempt, 30000)
        timer = setTimeout(() => {
          connect(attempt+1)
        }, delay);
      }
      socket.onerror =(er) => {
        return socket.close()
      } 
    }
    connect()

    return () => {
      clearTimeout(timer)
      socket.close()
    }
  },[orderId])
 
}
