const throttle = (fn, delay) => {
let timer;
return function (...args) {

if (!timer) {
    fn.apply(this, args);
    timer = setTimeout(() => {
        timer = null;
    }, delay);
}

}}





const throttledFn = throttle((arg) => {
    console.log("throttled", arg);
}, 3000);
throttledFn("test");
throttledFn("test2");
setTimeout(() => {
    throttledFn("test4");
}, 2000);
setTimeout(() => {
    throttledFn("test5");
}, 2500);
setTimeout(() => {
    throttledFn("test6");
}, 3000);
throttledFn("test3");

arr=[]
