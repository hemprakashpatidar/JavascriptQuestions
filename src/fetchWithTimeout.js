const fetchWithTimeout = (url, duration) => {
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    const signal = controller.signal;
    let timerid = null;

    fetch(url, { signal })
      .then((resp) => {
        resp
          .json()
          .then((e) => {
            // clear the timer once the API call is successfull before time
            clearTimeout(timerid);
            resolve(e);
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });

    // start the timer to abort the call incase it is not fullfilled in time
    timerid = setTimeout(() => {
      console.log("Aborted");
      controller.abort();
    }, duration);
  });
};

// Client side connection is aborted.
// Server might still process with request but wont be able to send
